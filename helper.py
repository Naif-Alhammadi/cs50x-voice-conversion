from flask import redirect, session
from functools import wraps


def login_required(f):
    """ Decorate routes to require login. """
    @wraps(f)
    def decorate(*args, **kargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kargs)

    return decorate

