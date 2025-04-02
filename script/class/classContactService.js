class ContactService {
  static async fetchContacts(courseID) {
    try {
      const query = `query calcContacts {
  calcContacts {
    Contact_ID: field(arg: ["id"])
    First_Name: field(arg: ["first_name"])
    Last_Name: field(arg: ["last_name"])
    Unique_ID: field(arg: ["unique_id"])
    Profile_Image: field(arg: ["profile_image"])
    Display_Name: field(arg: ["display_name"])
  }
}
`;

      const variables = { registered_course_id: courseID };

      const data = await ApiService.query(query, variables);

      return data.calcContacts.map((contact) => ({
        id: contact.Contact_ID,
        name: `${contact.First_Name} ${contact.Last_Name}` || "Anonymous",
        profileImage: contact.Profile_Image || CONFIG.api.defaultAuthorImage
      }));
    } catch (error) {
      return [];
    }
  }
}
