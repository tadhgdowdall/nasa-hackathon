from flask import Blueprint, jsonify, request
from app.services.data_service import data_service
from app.services.chatbot_service import chatbot_service

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'BioCosmos Dashboard API'})

@bp.route('/summaries', methods=['GET'])
def get_summaries():
    """Search publications by query and/or filter by topic"""
    query = request.args.get('query', '')
    limit = request.args.get('limit', default=20, type=int)
    topic = request.args.get('topic', default=None, type=str)

    # Allow browsing by topic without a query
    if not query and not topic:
        return jsonify({'error': 'Either query or topic parameter is required'}), 400

    # Cap limit at 200 for topic browsing, 100 for search
    max_limit = 200 if (topic and not query) else 100
    if limit > max_limit:
        limit = max_limit

    try:
        results = data_service.search_publications(query, limit=limit, topic=topic)
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/topics', methods=['GET'])
def get_topics():
    """Get topic distribution"""
    try:
        topics = data_service.get_topics()
        return jsonify(topics)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/chat', methods=['POST'])
def chat():
    """Handle chatbot queries with AI-generated responses"""
    try:
        data = request.get_json()
        query = data.get('query', '')

        if not query:
            return jsonify({'error': 'Query parameter is required'}), 400

        # Get search results from data service
        limit = data.get('limit', 10)
        search_results = data_service.search_publications(query, limit=limit)

        # Generate AI response using Gemini
        ai_response = chatbot_service.generate_response(query, search_results)

        return jsonify({
            'response': ai_response,
            'results': search_results
        })

    except ValueError as e:
        # Rate limit or API key errors
        error_msg = str(e)
        if 'Rate limit exceeded' in error_msg or 'Daily limit exceeded' in error_msg:
            return jsonify({'error': error_msg}), 429  # 429 Too Many Requests
        else:
            return jsonify({'error': error_msg}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
