from flask import Blueprint, render_template, jsonify, request
from models.user import User
from werkzeug.security import check_password_hash, generate_password_hash
from models.db import db
from mail_controller import send_verification_mail

auth_bp = Blueprint('auth_bp', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    hashed_password = generate_password_hash(password, method='sha256')

    new_user = User(username=username, email=email, password=hashed_password)
    try:
        db.session.add(new_user)
        db.session.commit()
        send_verification_mail(email)
        return jsonify({"message": "Kullanıcı başarıyla kaydedildi!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"message": "Kullanıcı bulunamadı!"}), 404

    if check_password_hash(user.password, password):
        return jsonify({"message": "Giriş başarılı!"}), 200
    else:
        return jsonify({"message": "Şifre yanlış!"}), 401
