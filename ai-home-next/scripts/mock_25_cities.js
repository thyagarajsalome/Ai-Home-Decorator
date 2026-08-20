const fs = require("fs");
const cities = [ "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "Austin, TX", "San Jose, CA", "Fort Worth, TX", "Jacksonville, FL", "Columbus, OH", "Charlotte, NC", "Indianapolis, IN", "San Francisco, CA", "Seattle, WA", "Denver, CO", "Washington, DC", "Boston, MA", "El Paso, TX", "Nashville, TN", "Detroit, MI", "Las Vegas, NV" ];
const styles = ["Modern", "Mid-Century Modern", "Industrial", "Coastal", "Farmhouse", "Contemporary"];
const data = cities.map(c => {
  const [name, state] = c.split(", ");
  const slug = name.toLowerCase().replace(/ /g, "-");
  const stateSlug = state.toLowerCase();
  const style = styles[Math.floor(Math.random() * styles.length)];
  return {
    city: slug, state: stateSlug, name, stateName: state,
    h1: "AI Interior Design for " + name + " Homes",
    intro: "Transform your " + name + " living space with our advanced AI interior design tool. Whether you are looking for a " + style + " refresh or a complete overhaul, we tailor the designs to match the unique architectural vibe of " + name + ".",
    popularStyle: style,
    styleDesc: style + " is incredibly popular in " + name + " right now, offering a perfect blend of form and function.",
    challenge: "Optimizing natural light and maximizing functional space in typical " + name + " floor plans."
  };
});
fs.writeFileSync("src/data/cities.json", JSON.stringify(data, null, 2));
