from flask import Blueprint, render_template
from models.user import User

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users')
def list_users():
    users = User.query.all()  # Model'den tüm kullanıcıları çekiyoruz
    return render_template('user_list.html', users=users)