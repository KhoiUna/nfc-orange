const greetUser = (name: string): string => {
  const hour = new Date().getHours();
  let greet = "";
  if (hour >= 6 && hour <= 11) {
    greet = "Good morning 🌄, ";
  } else if (hour >= 12 && hour <= 17) {
    greet = "Good afternoon ☀️, ";
  } else if (hour >= 18 && hour <= 24) {
    greet = "Good evening 🌃, ";
  } else if (hour >= 0 && hour <= 5) {
    greet = "Take some rest 🛏️, ";
  }

  return greet + name;
};

export default greetUser;
