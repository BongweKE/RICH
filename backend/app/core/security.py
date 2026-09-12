# RICH Backend - Security Utilities
# JWT authentication, password hashing, rate limiting

from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT
ALGORITHM = "HS256"
security = HTTPBearer()
optional_security = HTTPBearer(auto_error=False)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=settings.JWT_EXPIRY_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> dict | None:
    """Decode and validate JWT token"""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """Get current user from JWT token"""
    token = credentials.credentials
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload


async def get_current_user_optional(
    credentials: HTTPAuthorizationCredentials | None = Depends(optional_security),
):
    """Get current user if token provided, otherwise return None"""
    if credentials is None:
        return None
    return await get_current_user(credentials)


def check_rate_limit(request: Request, limit: int = None, period: int = None):
    """Check rate limit for request"""
    # In production, use Redis for distributed rate limiting
    # This is a simple in-memory implementation for development
    limit = limit or settings.RATE_LIMIT_REQUESTS
    period = period or settings.RATE_LIMIT_PERIOD

    # In production, implement proper rate limiting with Redis
    # For now, just return True (no limiting in development)
    if settings.APP_ENV == "development":
        return True

    # TODO: Implement Redis-based rate limiting
    return True


def require_role(required_roles: list):
    """Dependency to require specific roles"""
    async def role_checker(user: dict = Depends(get_current_user)):
        user_role = user.get("role", "guest")
        if user_role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Required role: {required_roles}, current: {user_role}",
            )
        return user
    return role_checker


# Role-based access control
ROLE_PERMISSIONS = {
    "guest": ["read:public"],
    "researcher": ["read:public", "read:all", "write:own", "analyze:own"],
    "policy_maker": ["read:public", "read:all", "write:own", "analyze:all", "report:all"],
    "admin": ["read:public", "read:all", "write:all", "analyze:all", "report:all", "admin:all"],
}


def has_permission(user_role: str, permission: str) -> bool:
    """Check if role has permission"""
    return permission in ROLE_PERMISSIONS.get(user_role, [])


def require_permission(permission: str):
    """Dependency to require specific permission"""
    async def permission_checker(user: dict = Depends(get_current_user)):
        user_role = user.get("role", "guest")
        if not has_permission(user_role, permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Required permission: {permission}",
            )
        return user
    return permission_checker