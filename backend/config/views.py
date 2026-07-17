from django.db import connection
from django.http import JsonResponse


def health_check(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1;")
            cursor.fetchone()

        return JsonResponse(
            {
                "status": "ok",
                "database": "connected",
            }
        )

    except Exception:
        return JsonResponse(
            {
                "status": "error",
                "database": "disconnected",
            },
            status=503,
        )
