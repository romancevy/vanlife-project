import User from "../models/User.js";

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  //Prüfe ob alle erforderlichen Daten vorhanden sind
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide all values" });
  }

  // Suche den Benutzer in der DB anhand der E-Mail-Adresse.
  // Zwecks Datensicherheit werden Passwortfelder normalerweise ausgeschlossen!
  // die select-Methode dient dazu, das Passwortfeld explizit aus aus der DB auszuwählen
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return res.status(401).json({ msg: "Invalid Credentials" });
  }

  // Vergleiche das Passwort vom Benutzer mit dem ausgewählten Passwort aus der DB
  //   const isPasswordCorrect = await user.comparePassword(password);
  //   console.log(isPasswordCorrect);

  // Wenn das eingegebene Passwort falsch ist, gibt die Funktion eine Fehlermeldung zurück
  // und bricht den Anmeldevorgang ab
  //   if (!isPasswordCorrect) {
  //     res.status(401).json({ msg: "Invalid Credentials" });
  //     return;
  //   }

  // erstellt einen neuen JSON-Web-Token für den "user"
  const token = user.createJWT();

  // Passwortfeld wird unkenntlich gemacht, bevor es an den Client zurückgegeben wird
  user.password = undefined;
  res.status(200).json({ user, token });
};
