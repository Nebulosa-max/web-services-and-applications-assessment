from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db
from models.task import Task
from models.subject import Subject
from datetime import datetime

tasks = Blueprint("tasks", __name__)

@tasks.route("/api/tasks", methods=["GET"])
@login_required
def get_tasks():
    user_tasks = Task.query.filter_by(user_id=current_user.id).all()

    task_list = []
    for task in user_tasks:
        task_list.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date.strftime("%Y-%m-%d") if task.due_date else "",
            "priority": task.priority,
            "completed": task.completed,
            "subject_id": task.subject_id,
            "subject_name": task.subject.name if task.subject else "No Subject"
        })

    return jsonify(task_list)

@tasks.route("/api/tasks", methods=["POST"])
@login_required
def add_task():
    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    due_date = data.get("due_date")
    priority = data.get("priority")
    subject_id = data.get("subject_id")

    if not title or not subject_id:
        return jsonify({"error": "Title and subject are required"}), 400

    subject = Subject.query.filter_by(id=subject_id, user_id=current_user.id).first()
    if not subject:
        return jsonify({"error": "Invalid subject"}), 400

    parsed_due_date = None
    if due_date:
        parsed_due_date = datetime.strptime(due_date, "%Y-%m-%d")

    task = Task(
        title=title,
        description=description,
        due_date=parsed_due_date,
        priority=priority if priority else "Medium",
        completed=False,
        user_id=current_user.id,
        subject_id=subject_id
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({"message": "Task created successfully"}), 201

@tasks.route("/api/tasks/<int:task_id>", methods=["DELETE"])
@login_required
def delete_task(task_id):
    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"})

@tasks.route("/api/tasks/<int:task_id>/toggle", methods=["PATCH"])
@login_required
def toggle_task(task_id):
    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    task.completed = not task.completed
    db.session.commit()

    return jsonify({"message": "Task updated successfully"})