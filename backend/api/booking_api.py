from flask import Blueprint, jsonify, abort, request
from model.user import User
from model.booking import Booking
from model.job import Job
from database.db import db
from flask_bcrypt import Bcrypt
from flask_jwt_extended import get_jwt, jwt_required, get_jwt_identity
import os

booking_api = Blueprint("booking_api", __name__)
bcrypt = Bcrypt()


@booking_api.route("/booking", methods=["POST"])
@jwt_required()
def create_booking():
    user_id = get_jwt_identity()
    resume_id = request.json.get("resume_id")
    job_id = request.json.get("job_id")

    if not User.query.get(user_id):
        abort(404, description="User not found")

    if not Job.query.get(job_id):
        abort(404, description="Job not found")

    if not resume_id:
        abort(400, description="Missing resume_id")

    offer_price = request.json.get("offer_price", 0)
    final_price = request.json.get("final_price")

    booking = Booking(
        resume_id=resume_id,
        job_id=job_id,
        user_id=user_id,
        status=False,
        offer_price=offer_price,
        final_price=final_price,
    )
    booking.save()

    return jsonify({"msg": "Booking created successfully"}), 201
