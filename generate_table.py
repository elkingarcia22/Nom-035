#!/usr/bin/env python3

# Generar tabla con todas las preguntas NOM-035 y respuestas literales

# Preguntas NOM-035 (primeras 20 para ejemplo)
questions = [
    "¿Tu lugar de trabajo tiene buena iluminación, temperatura y ventilación?",
    "¿Cuentas con las herramientas y equipos necesarios para realizar bien tus tareas?",
    "¿Tu lugar de trabajo es seguro y tiene condiciones adecuadas para evitar accidentes?",
    "¿Te sientes cómodo y tranquilo en el espacio donde trabajas?",
    "¿Tu trabajo requiere que trabajes muy rápido o bajo presión constante?",
    "¿Tienes que atender varios asuntos o tareas al mismo tiempo?",
    "¿Tu trabajo demanda un alto nivel de concentración o esfuerzo mental?",
    "¿Debes tomar decisiones importantes que generan presión o preocupación?",
    "¿Sientes que tu trabajo te exige mucho esfuerzo emocional?",
    "¿Tu trabajo requiere manejar situaciones difíciles con otras personas?",
    "¿Tienes claridad sobre lo que se espera de ti y las metas que debes cumplir?",
    "¿Tienes suficiente autonomía para decidir cómo hacer tu trabajo?",
    "¿Recibes reconocimiento o agradecimiento cuando haces bien tu trabajo?",
    "¿Sientes que tu trabajo tiene sentido o utilidad para otras personas?",
    "¿Tu jornada de trabajo te permite tener tiempo para ti o tu familia?",
    "¿Puedes tomar descansos suficientes durante tu jornada laboral?",
    "¿Con qué frecuencia tienes que quedarte más tiempo del establecido?",
    "¿Tu horario de trabajo te permite conciliar tus responsabilidades personales?",
    "¿Tu jefe inmediato te escucha y te apoya cuando tienes dificultades?",
    "¿Tu jefe te trata con respeto y equidad?"
]

# Respuestas literales
responses = {
    "Siempre": {"bg": "#10b981", "text": "Siempre"},
    "Casi siempre": {"bg": "#f59e0b", "text": "Casi siempre"},
    "Algunas veces": {"bg": "#ef4444", "text": "Algunas veces"},
    "Casi nunca": {"bg": "#6b7280", "text": "Casi nunca"},
    "Nunca": {"bg": "#374151", "text": "Nunca"}
}

# Participantes de ejemplo
participants = [
    {"name": "María González", "role": "Gerente de Ventas", "initials": "MG", "risk": "BAJO", "percentage": "85%", "responses": ["Siempre", "Casi siempre", "Siempre", "Siempre", "Algunas veces", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre"]},
    {"name": "Carlos Rodríguez", "role": "Desarrollador Senior", "initials": "CR", "risk": "MEDIO", "percentage": "65%", "responses": ["Casi siempre", "Algunas veces", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre", "Casi siempre"]},
    {"name": "Ana López", "role": "Analista de RRHH", "initials": "AL", "risk": "ALTO", "percentage": "45%", "responses": ["Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces", "Algunas veces"]},
    {"name": "José Martínez", "role": "Coordinador de Proyectos", "initials": "JM", "risk": "BAJO", "percentage": "78%", "responses": ["Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre", "Siempre"]}
]

print("<!-- Tabla con scroll horizontal -->")
print('<div style="overflow-x: auto; max-width: 100%;">')
print('<table style="width: 100%; border-collapse: collapse; min-width: 4000px;">')
print('<thead style="background: #f8f9fa; position: sticky; top: 0; z-index: 10;">')
print('<tr>')
print('<!-- Columna fija del participante -->')
print('<th style="position: sticky; left: 0; background: #f8f9fa; border: 1px solid #e5e7eb; padding: 12px; text-align: left; font-weight: 600; color: #374151; min-width: 200px; z-index: 11;">Participante</th>')
print('<!-- Columnas de métricas principales -->')
print('<th style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; font-weight: 600; color: #374151; min-width: 120px; background: #f0f9ff;">Nivel de Riesgo</th>')
print('<th style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; font-weight: 600; color: #374151; min-width: 100px; background: #f0f9ff;">Porcentaje</th>')

# Headers de preguntas
for i, question in enumerate(questions):
    print(f'<th style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; font-weight: 600; color: #374151; min-width: 150px; background: #fef3c7; font-size: 11px;">{question}</th>')

print('</tr>')
print('</thead>')
print('<tbody>')

# Filas de participantes
for i, participant in enumerate(participants):
    bg_color = "white" if i % 2 == 0 else "#f8f9fa"
    print(f'<tr style="background: {bg_color};">')
    
    # Columna del participante
    print(f'<td style="position: sticky; left: 0; background: {bg_color}; border: 1px solid #e5e7eb; padding: 12px; font-weight: 600; color: #374151; z-index: 1;">')
    print('<div style="display: flex; align-items: center; gap: 12px;">')
    print(f'<div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">{participant["initials"]}</div>')
    print('<div>')
    print(f'<div style="font-weight: 600; color: #374151;">{participant["name"]}</div>')
    print(f'<div style="font-size: 12px; color: #6b7280;">{participant["role"]}</div>')
    print('</div>')
    print('</div>')
    print('</td>')
    
    # Métricas principales
    risk_color = "#10b981" if participant["risk"] == "BAJO" else "#f59e0b" if participant["risk"] == "MEDIO" else "#ef4444"
    print(f'<td style="border: 1px solid #e5e7eb; padding: 12px; text-align: center;">')
    print(f'<span style="background: {risk_color}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">{participant["risk"]}</span>')
    print('</td>')
    print(f'<td style="border: 1px solid #e5e7eb; padding: 12px; text-align: center; font-weight: 600; color: #374151;">{participant["percentage"]}</td>')
    
    # Respuestas a las preguntas
    for response in participant["responses"]:
        resp_data = responses[response]
        print(f'<td style="border: 1px solid #e5e7eb; padding: 12px; text-align: center;">')
        print(f'<span style="background: {resp_data["bg"]}; color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px;">{resp_data["text"]}</span>')
        print('</td>')
    
    print('</tr>')

print('</tbody>')
print('</table>')
print('</div>')
