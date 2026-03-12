from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from faker import Faker
import time

faker = Faker()

driver = webdriver.Firefox()
driver.get("http://localhost:3000")

wait = WebDriverWait(driver, 3)
task_text = faker.sentence()
task_input = driver.find_element(By.XPATH, "/html/body/main/form/input")
task_input.send_keys(task_text)

task_input.submit()

assert any(task_text in task.text for task in tasks), "La tarea no se creó correctamente"

print("Tarea creada exitosamente")

task_checkbox = driver.find_element(By.CSS_SELECTOR, "input[type='checkbox']")
task_checkbox.click()

task_completed = driver.find_element(By.CSS_SELECTOR, "li.completed")
assert task_text in task_completed.text, "La tarea no se completó correctamente"

print("Tarea completada exitosamente")
task_delete_button = driver.find_element(By.CSS_SELECTOR, "button[title='Eliminar']")
task_delete_button.click()

task_delete_confirm_button = driver.find_element(By.CSS_SELECTOR, "button.deleteButtonConfirm")
task_delete_confirm_button.click()

tasks = task_list.find_elements(By.TAG_NAME, "li")
assert not any(task_text in task.text for task in tasks), "La tarea no se eliminó correctamente"

print("Tarea eliminada exitosamente")

# Cerrar el driver
driver.quit()