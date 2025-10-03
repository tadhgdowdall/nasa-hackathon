from flask import Blueprint, jsonify, request
from app.services.data_service import data_service

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'BioCosmos Dashboard API'})

@bp.route('/summaries', methods=['GET'])
def get_summaries():
    """Search publications by query"""
    query = request.args.get('query', '')

    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    try:
        results = data_service.search_publications(query, limit=5)
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
