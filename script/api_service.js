class ApiService {
  static async query(query, variables = {}) {
    try {
      const response = await fetch(CONFIG.api.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": CONFIG.api.key
        },
        body: JSON.stringify({ query, variables })
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const { data, errors } = await response.json();

      if (errors) {
        const errorMessages = Array.isArray(errors)
          ? errors.map((e) => e.message).join("\n")
          : errors.message || "Unknown error";
        throw new Error(errorMessages);
      }
      return data;
    } catch (error) {
      console.log(
        "The catch handler is being run now. which throws err to higher catch handler"
      );
      throw error;
    }
  }
}
