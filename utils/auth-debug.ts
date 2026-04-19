// utils/auth-debug.ts
export const debugAuthFlow = async () => {
  console.log("🔍 DEBUGGING AUTH FLOW");
  
  // 1. Check current state
  console.log("1. Document cookies:", document.cookie);
  
  // 2. Test /User/me
  console.log("2. Testing /User/me...");
  try {
    const response = await fetch('http://localhost:5120/api/User/me', {
      credentials: 'include'
    });
    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response:", text);
  } catch (error) {
    console.log("Error:", error);
  }
  
  // 3. Test dashboard
  console.log("3. Testing dashboard access...");
  try {
    const response = await fetch('/dashboard', { redirect: 'manual' });
    console.log("Dashboard status:", response.status);
    console.log("Redirect location:", response.headers.get('location'));
  } catch (error) {
    console.log("Error:", error);
  }
};

// Add to window for easy access
if (typeof window !== 'undefined') {
  (window as any).debugAuth = debugAuthFlow;
}