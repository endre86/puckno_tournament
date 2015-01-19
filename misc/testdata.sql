# NM15
INSERT INTO tournaments (id, name, language, date, deadline, fee, venue, contact, image, misc, program, details)
VALues ("nm15", "Norsk Mesterskap 2015", "no", "2015-05-17", "2015-05-16", "300 (150 for junior)", "Scandic Hotel Bergen", "endre.vestbo@gmail.com", "images/logos/nba.png", "[{\"item\": \"Bankett\", \"value\": \"Holmin spanderer!\"}]", 	"[{\"day\": \"Lørdag\", \"events\": [{\"time\": \"0800\", \"event\": \"Dørene åpner\"}, {\"time\": \"0900\", \"event\": \"Turnering starter\"}]},{\"day\": \"Søndag\", \"events\": [{\"time\": \"0800\", \"event\": \"Dørene åpner\"}, {\"time\": \"0900\", \"event\": \"Lagturnering starter\"}]}]", "[{\"title\": \"Informasjon\", \"content\": \"Lorem ipsum ...\"}, {\"title\": \"Overnatting\", \"content\": \"Lorem ipsum ...\"}]");

INSERT INTO subtournaments (tournament_id, name) values ("no15", "Norsk Mesterskap");
INSERT INTO subtournaments (tournament_id, name) values ("no15", "Norsk Mesterskap JR");
INSERT INTO subtournaments (tournament_id, name) values ("no15", "NM Lag");



# BO15
INSERT INTO tournaments (id, name, language, date, deadline, fee, venue, contact, image, misc, program, details)
VALues ("bo15", "Bergen Open 2015", "no", "2015-05-17", "2015-05-16", "300 (150 for junior)", "Scandic Hotel Bergen", "endre.vestbo@gmail.com", "images/logos/nba.png", "[{\"item\": \"Bankett\", \"value\": \"Holmin spanderer!\"}]", 	"[{\"day\": \"Lørdag\", \"events\": [{\"time\": \"0800\", \"event\": \"Dørene åpner\"}, {\"time\": \"0900\", \"event\": \"Turnering starter\"}]}]", "[{\"title\": \"Informasjon\", \"content\": \"Lorem ipsum ...\"}]");

INSERT INTO subtournaments (tournament_id, name) values ("bo15", "Bergen Open");

# TO15
INSERT INTO tournaments (id, name, language, date, deadline, fee, venue, contact, image, misc, program, details)
VALues ("to15", "Trondheim Open 2015", "no", "2015-05-17", "2015-05-16", "300 (150 for junior)", "Scandic Hotel Bergen", "endre.vestbo@gmail.com", "images/logos/nba.png", "[{\"item\": \"Bankett\", \"value\": \"Holmin spanderer!\"}]", 	"[{\"day\": \"Lørdag\", \"events\": [{\"time\": \"0800\", \"event\": \"Dørene åpner\"}, {\"time\": \"0900\", \"event\": \"Turnering starter\"}]}]", "[{\"title\": \"Informasjon\", \"content\": \"Lorem ipsum ... Endre Vestbø\"}]");

INSERT INTO subtournaments (tournament_id, name) values ("bo15", "Bergen Open");