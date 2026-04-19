from flask import Flask, render_template
from flask_login import current_user, login_required
from config import Config
from models import db, login_manager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)

    from models.user import User
    from models.subject import Subject
    from models.task import Task

    from routes.auth_routes import auth
    from routes.subject_routes import subjects
    from routes.task_routes import tasks

    app.register_blueprint(auth)
    app.register_blueprint(subjects)
    app.register_blueprint(tasks)

    @app.route("/")
    def home():
        return render_template("index.html")

    @app.route("/dashboard")
    @login_required
    def dashboard():
        return render_template("dashboard.html", user=current_user)

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)