import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables);
  
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";
  
  let fullName = "";
  if (variables.name || variables.lastName) {
    fullName = `${variables.name || ""} ${variables.lastName || ""}`.trim();
  }
  
  let role = variables.role || "";
  
  let location = "";
  if (variables.city || variables.country) {
    location = `${variables.city || ""}${variables.city && variables.country ? ", " : ""}${variables.country || ""}`;
  }
  
  let socialMediaLinks = [];
  if (variables.twitter) {
    socialMediaLinks.push(`<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`);
  }
  if (variables.github) {
    socialMediaLinks.push(`<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`);
  }
  if (variables.linkedin) {
    socialMediaLinks.push(`<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fa fa-linkedin"></i></a></li>`);
  }
  if (variables.instagram) {
    socialMediaLinks.push(`<li><a href="https://instagram.com/${variables.instagram}"><i class="fa fa-instagram"></i></a></li>`);
  }

  const socialPositionClass = variables.socialMediaPosition || "position-left";

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML =
  `<div class="widget">
        ${cover}
        <img src="${variables.avatarURL}" class="photo" />
        ${fullName ? `<h1>${fullName}</h1>` : ""}
        ${role ? `<h2>${role}</h2>` : ""}
        ${location ? `<h3>${location}</h3>` : ""}
        ${socialMediaLinks.length > 0 ? `<ul class="${socialPositionClass}">${socialMediaLinks.join("")}</ul>` : ""}
  </div>`;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
