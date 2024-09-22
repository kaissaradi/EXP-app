import tkinter as tk
from tkinter import ttk
from ttkthemes import ThemedTk

class ExperienceTracker:
    def __init__(self):
        self.experience = []

    add_experience = lambda self, amount, category: self.experience.append({"amount": amount, "category": category})

    total_experience = lambda self, selected_experience: sum(experience["amount"] for experience in selected_experience)

# List of Activities (change ammount and name to what matches your goals)
tracker = ExperienceTracker()
tracker.add_experience(5.50, "Run")
tracker.add_experience(5.50, "Climb")
tracker.add_experience(3.50, "Workout")
tracker.add_experience(7.25, "Studying / Coding")
tracker.add_experience(7.25, "Reading")
tracker.add_experience(3.50, "School")
tracker.add_experience(3.00, "Cold Showers")
tracker.add_experience(4.50, "Eat Healthily")
tracker.add_experience(5.00, "Puzzle Rush Set")



# main window 
root = ThemedTk(theme="clam")
root.geometry("600x500")

# Entry Label and widget
entry_label = tk.Label(root, text="Enter Multiplier") # multiplier is how maniy you got done in the day
entry_label.pack()
entry = tk.Entry(root) # widget
entry.pack(pady=10)

# Create a list to store the state of each checkbox
checkbox_vars = []

def update_expense_checkboxes():
    for widget in root.winfo_children():
        if isinstance(widget, tk.Checkbutton):
            widget.destroy()

    for experience in tracker.experience:
        var = tk.BooleanVar()
        checkbox = tk.Checkbutton(root, text=f"{experience['category']}: {experience['amount']:.2f}", variable=var)
        checkbox.pack(pady=1)
        checkbox_vars.append((var, experience))


# Update the progress bar with total exp value
def update_progressbar(total_exp):
    progressbar['value'] = total_exp
    root.update_idletasks()


# final function tied to split money button
def calc_exp():
    try:
        multiplier = float(entry.get())
        selected_experience = [experience for var, experience in checkbox_vars if var.get()]
        base_exp = tracker.total_experience(selected_experience)
        total_exp = multiplier * base_exp
        progress.set(total_exp)
        update_progressbar(total_exp)
        Total_exp_display.config(text=f"Total Experience: {total_exp:.2f}")
    except ValueError:
        print("error")

update_expense_checkboxes()

# Calculate total exp button
calc_bills_btn = tk.Button(root, text="Get EXP!", command=calc_exp)
calc_bills_btn.pack(pady=10)

# Total EXP display Label 
Total_exp_display = tk.Label(root, text="Total Experience:")
Total_exp_display.pack()

# Progress bar & progress definition
progress = tk.IntVar()
progressbar = ttk.Progressbar(root, length=200, mode='determinate', maximum=2240, variable=progress)
progressbar.pack()

# Create and place the exit button
exit_button = tk.Button(root, text="GO out and earn more!", command=quit)
exit_button.pack(pady=10)

root.mainloop() 
