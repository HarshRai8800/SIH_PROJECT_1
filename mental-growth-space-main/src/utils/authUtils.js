/**
 * Utility functions for handling authentication and user management
 */

/**
 * Handles user registration with database save and cleanup on failure
 * @param {string} token - Clerk authentication token
 * @param {string} role - User role (student/counsellor)
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const registerUserWithCleanup = async (token, role) => {
  try {
    const response = await fetch("http://localhost:5000/api/registerUser", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || "Registration failed",
        clerkUserDeleted: responseData.clerkUserDeleted || false,
        details: responseData.details
      };
    }

    return {
      success: true,
      data: responseData.data,
      role: responseData.role
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Network error during registration. Please try again.",
      details: error.message
    };
  }
};

/**
 * Clears user data from localStorage
 */
export const clearUserData = () => {
  localStorage.removeItem("selectedRole");
  localStorage.removeItem("userProfile");
  // Add any other user-related data that should be cleared
};

/**
 * Shows user-friendly error messages based on error type
 * @param {Object} error - Error object from registration
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (error.clerkUserDeleted) {
    return "Account creation failed. Please try again with a different email or contact support.";
  }
  
  if (error.error?.includes("database")) {
    return "Unable to save your profile. Please try again or contact support.";
  }
  
  if (error.error?.includes("email")) {
    return "There was an issue with your email. Please try again.";
  }
  
  return error.error || "An unexpected error occurred. Please try again.";
};


