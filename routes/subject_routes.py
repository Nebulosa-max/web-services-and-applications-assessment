from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db
from models.subject import Subject

subjects = Blueprint("subjects", __name__)

@subjects.route("/api/subjects", methods=["GET"])
@login_required
def get_subjects():
    user_subjects = Subject.query.filter_by(user_id=current_user.id).all()

    subject_list = []
    for subject in user_subjects:
        subject_list.append({
            "id": subject.id,
            "name": subject.name,
            "description": subject.description
        })

    return jsonify(subject_list)

@subjects.route("/api/subjects", methods=["POST"])
@login_required
def add_subject():
    data = request.get_json()

    name = data.get("name")
    description = data.get("description")

    if not name:
        return jsonify({"error": "Subject name is required"}), 400

    subject = Subject(
        name=name,
        description=description,
        user_id=current_user.id
    )

    db.session.add(subject)
    db.session.commit()

    return jsonify({
        "message": "Subject created successfully"
    }), 201

@subjects.route("/api/subjects/<int:subject_id>", methods=["DELETE"])
@login_required
def delete_subject(subject_id):
    subject = Subject.query.filter_by(
        id=subject_id,
        user_id=current_user.id
    ).first()

    if not subject:
        return jsonify({"error": "Subject not found"}), 404

    db.session.delete(subject)
    db.session.commit()

    return jsonify({
        "message": "Subject deleted successfully"
    })