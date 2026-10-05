"""
Simple Calculator
A command-line calculator that performs basic arithmetic operations.

Author: Laiba Aftab
"""


def calculate(num1, operator, num2):
    """Return the result of applying operator to num1 and num2."""
    if operator == "+":
        return num1 + num2
    elif operator == "-":
        return num1 - num2
    elif operator == "*":
        return num1 * num2
    elif operator == "/":
        if num2 == 0:
            return "Error: Cannot divide by zero."
        return num1 / num2
    else:
        return "Error: Invalid operator. Please use +, -, *, or /."


def main():
    print("Simple Calculator")
    print("Supported operators: +  -  *  /\n")

    try:
        num1 = float(input("Enter first number: "))
        operator = input("Enter operator (+, -, *, /): ").strip()
        num2 = float(input("Enter second number: "))
    except ValueError:
        print("Error: Please enter valid numbers.")
        return

    result = calculate(num1, operator, num2)
    print("Result:", result)


if __name__ == "__main__":
    main()
