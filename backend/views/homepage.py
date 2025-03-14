from flask import Blueprint, render_template
from backend.models.user import User

home_bp = Blueprint('home_bp', __name__)

@home_bp.route('/')
def home():
    users = User.query.all()  # Model’den verileri çekiyoruz
    return render_template('home.html', users=users)