<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        .form-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            background-color: transparent;
            padding: 20px;
            border-radius: 5px;
        }
        .form-step {
            display: flex;
            flex-direction: column;
        }
        label {
            font-weight: bold;
            font-size: 16px;
        }
        input {
            padding: 24px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        #email, #phone {
            margin-top: 16px;
        }
        .invalid {
            border-color: red;
        }
        .schedule-container {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            padding: 24px;
            border-radius: 5px;
        }
        .schedule {
            margin-left: 10px;
            font-size: 16px;
        }
        button {
            margin-top: 20px;
            margin-bottom: 10px;
            padding: 24px;
            border: none;
            background: linear-gradient(to right, #32665c, #78a977);
            color: white;
            border-radius: 5px;
            cursor: pointer;
            align-self: center;
            width: 100%;
            font-weight: bold;
            font-size: 24px;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        button:hover {
            transform: translateY(-16px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
        }
        .error-message {
            color: red;
            font-size: 14px;
            margin-top: 5px;
            display: none;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <form id="step1" class="form-step">
            <input type="text" id="name" name="name" placeholder="First Name" required>
            <div class="error-message" id="name-error">Please enter your name.</div>
            
            <input type="email" id="email" name="email" placeholder="Best Email" required>
            <div class="error-message" id="email-error">Please enter a valid email address.</div>

            <input type="tel" id="phone" name="phone" placeholder="Phone Number" required>
            <div class="error-message" id="phone-error">Please enter a valid phone number.</div>
            
            <button type="button" id="next-button" onclick="nextStep()">Yes! I Want To Join The Training</button>
        </form>
        <form id="step2" class="form-step" style="display:none;">
            <div class="schedule-container">
                <label>
                    <input type="radio" name="session" value="next-session" checked>
                    Next Session:
                </label>
                <div class="schedule" id="schedule"></div>
            </div>
            <button type="submit" onclick="registerForWebinar2(event)">Register</button>
        </form>
    </div>
    <script>
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const phoneError = document.getElementById('phone-error');
        const nextButton = document.getElementById('next-button');

        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        phoneInput.addEventListener('input', validatePhone);

        function validateName() {
            if (nameInput.value.trim() === '') {
                nameError.style.display = 'block';
                nameInput.classList.add('invalid');
                return false;
            } else {
                nameError.style.display = 'none';
                nameInput.classList.remove('invalid');
                return true;
            }
        }

        function validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.style.display = 'block';
                emailInput.classList.add('invalid');
                return false;
            } else {
                emailError.style.display = 'none';
                emailInput.classList.remove('invalid');
                return true;
            }
        }

        function validatePhone() {
            const phonePattern = /^\d+$/; // Simple pattern for a 10-digit phone number
            if (!phonePattern.test(phoneInput.value.trim())) {
                phoneError.style.display = 'block';
                phoneInput.classList.add('invalid');
                return false;
            } else {
                phoneError.style.display = 'none';
                phoneInput.classList.remove('invalid');
                return true;
            }
        }

        function nextStep() {
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();

            if (isNameValid && isEmailValid && isPhoneValid) {
                document.getElementById('step1').style.display = 'none';
                document.getElementById('step2').style.display = 'block';
                updateSchedule();
            }
        }

        function updateSchedule() {
            const now = new Date();
            const day = now.toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
            });

            let hours = now.getHours();
            const minutes = now.getMinutes();
            let nextMinutes = 0;
            let ampm = 'AM';

            if (hours >= 23 || hours < 7) {
                hours = 7;
                nextMinutes = 0;
                ampm = 'AM';
            } else {
                if (minutes < 15) {
                    nextMinutes = 15;
                } else if (minutes < 30) {
                    nextMinutes = 30;
                } else if (minutes < 45) {
                    nextMinutes = 45;
                } else {
                    nextMinutes = 0;
                    hours++;
                }

                ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12 || 12;
            }

            const time = `${hours}:${nextMinutes.toString().padStart(2, '0')} ${ampm}`;
            const schedule = `${day} at ${time}`;
            document.getElementById('schedule').textContent = schedule;
        }

        function registerForWebinar2(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            const payload = {
                first_name: name,
                email: email,
                phone: phone
            };

            const registrationUrl = `https://event.webinarjam.com/register/1click/28/l9v5msy1?first_name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone_number=${encodeURIComponent(phone)}&schedule_id=1`;

            window.location.href = registrationUrl;
        }
    </script>
</body>
</html>