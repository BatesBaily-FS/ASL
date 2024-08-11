import datetime

current_date = datetime.date.today().strftime("%Y-%m-%%d")

print(f"Hello ASL! (Current date: {current_date})")
