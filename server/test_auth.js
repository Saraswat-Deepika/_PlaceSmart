const testAuth = async () => {
    const signupData = {
        name: "Test User 3",
        email: "test3@example.com",
        password: "password123",
        role: "student"
    };

    try {
        console.log("Testing Signup...");
        const signupRes = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
        });

        const signupJson = await signupRes.json();

        if (signupRes.ok) {
            console.log("Signup Success:", signupJson);
        } else {
            console.error("Signup Failed:", signupRes.status, signupJson);
        }

    } catch (error) {
        console.error("Signup Error:", error.message);
    }

    try {
        console.log("\nTesting Login...");
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: "test3@example.com",
                password: "password123"
            })
        });

        const loginJson = await loginRes.json();

        if (loginRes.ok) {
            console.log("Login Success:", loginJson);
        } else {
            console.error("Login Failed:", loginRes.status, loginJson);
        }

    } catch (error) {
        console.error("Login Error:", error.message);
    }
};

testAuth();
