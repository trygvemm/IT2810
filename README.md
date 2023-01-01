# BookHunter

BookHunter er en app for søking etter, samt sortering og filtrering av bøker. Brukere har også mulighet til å legge til kommentarer på bøkene.

Datasettet er hentet fra https://github.com/benoitvallon/100-best-books/blob/master/books.json. Vi valgte å gå for et relativt lite og enkelt datasett, slik at vi kunne fokusere på det tekniske og læringen, fremfor å håndtere obskure unntak. Selv om datasettet er lite, anser vi det imidlertid som passe stort til at vi får testet listebasert presentasjon med mulighet for å håndtere resultatsett av vilkårlig størrelse. Dette har vi løst ved hjelp av den eksterne komponenten "react-infinite-scroll-component".

For å sortere så må man trykke på kolonnen man vil sortere på. F.eks kan man trykke på "Year" for å sortere på årstall i stigende rekkefølge, og så kan man trykke på den igjen for å sortere i synkende rekkefølge.

# Endringer P3 -> P4

I prosjekt 4 har gruppen valgt oppgave basert på tilbakemeldinger fra medstudentvurderinger. Vi har jobbet med å forbedre klienten og backenden (oppg. c), og i tillegg bearbeide klienten i prosjekt 3 så den tilfredsstiller kravene til WAD og WCAG 2.1 (oppg. d). Vi har også brukt tilbakemeldinger fra tester utført med Axe dev-tools for å forbedre accessibility.

### Forbedringer i aspekter knyttet til accessibility og universell utforming

For å tilrettelegge for brukere som ikke har mulighet til å bruke mus, eller av andre grunner er avhengig av å bruke keyboard, har vi gjort det mulig å navigere til alle radene i boklisten ved hjelp av tab-tasten. Vi har også lagt til to input-bokser der brukere kan endre årstallfilteret. Disse boksene er enkle å tabbe til, og tilrettelegger godt for brukere som ikke kan bruke mus.

Vi har også kuttet ned på bruken av ikke-semantiske HTML-elementer og erstattet dem med semantiske HTML-elementer. Dette forbedrer accessibility. For det første gjør det det lettere for screen-readers og andre accessibility-verkøty å parse nettsiden vår. For det andre har semantiske HTML-elementer flere accessibility-fordeler. For eksempel har < button > innebygget keyboard-accessibility som gjør at brukere kan tabbe mellom buttons og selektere ved hjelp av space eller enter.

I tillegg har vi forbedret nettsidens lesbarhet ved å endre til farger med sterkere kontraster. Søkefeltet, "Pick language"-dropdownen, og inputfeltet knyttet til kommentarfeltet har nå en hvit bakgrunn med svart tekst. Tabellen med oversikt over bøker har også endret farge til en mørk gråfarge med hvit tekst. Her er også kontrasten forbedret sammenlignet med slik det var i P3.

Vi har også lagt til aria-labels på interaktive elementer for å tilrettelegge for screen-readers.

#### Axe-devtools feilmedlinger

Vi har brukt Google-utvidelsen axe-devtools for å teste appens accessibility. Den gir 2 feilmeldinger på hjemsiden:

- "Element must have sufficient color contrast".

  Denne feilmeldingen oppstår på grunn av den lille pilen på "Pick language"-dropdownmenyen vår. Ettersom elementene som inngår her åpenbart har tydelige kontraster, velger vi å ignorere denne feilmeldingen.

- "Elements should not have tabindex greater than zero".

  Uten tabindex kan ikke brukere tabbe gjennom tabellen. Derfor har vi lagt til tabindex på alle interaktive elementer på hjemsiden. Selv om dette fungerer helt greit, er det ikke en optimal løsning: Hvis man vil legge til flere komponenter, blir man nødt til å oppdatere alle tabindexer manuelt. Ettersom prosjektet er ferdig, tenkte vi dette var en grei løsning.

### Andre forbedringer

Etter prosjekt 3 fikk vi flere tilbakemeldinger på at graphql-typeDefs, resolvers, interaces og serverkoden var samlet i index.ts-fila, og at dette var ganske uoversiktlig. I prosjekt 4 har vi av den grunn separert koden ut i fire filer: index.ts, interfaces.ts, resolvers.ts og typeDefs.ts.

Vi fikk også flere tilbakemeldinger på at måten søkefunksjonaliteten var implementert på i P3 ikke var optimal. Slik som det var i P3, ville det hver gang en bruker skrev inn et tegn i søkefeltet sendes et nytt kall til serveren, og siden ville oppdatere seg. Dette førte til en unødvendig stor mengde kall og re-renders. Vi har derfor endret implementasjonen slik at siden kun oppdaterer seg, og serveren kun kalles, når brukeren har trykket på "søk"-knappen eller entertasten.

Det var også en del som kommenterte det at valgalternativene i "Pick language"-dropdownmenyen var hardkodet. I P4 er valgalternativene i denne menyen basert på hvilke distinkte språk som eksisterer i databasen.

I P3 eksisterte det en bug på siden med oversikt over en enkelt bok. Denne buggen kom som et resultat av at vi var nødt til å bytte til Hashrouter i siste liten. I P4 har vi eliminert denne buggen.

Vi har også lagt til en success-toast som dukker opp når en bruker har postet en kommentar. Denne endringen gir bedre feedback, og det er tydeligere for brukere at de faktisk har postet en kommentar.

Da vi leverte P3 var det også en del av testene som ikke fungerte helt som de skulle. Dette var i likhet med buggen knyttet til boksiden et resultat av at vi ble nødt til å bytte router til hashrouter i siste liten. Derfor fikset vi dette slik at testene funker med hashrouter. I tillegg la vi til id på de elementene/objektene som aksesseres under testene. Tidligere brukte vi bare css selectors for å aksessere disse elementene, men nå har vi en kombinasjon med bruk av id der det gir mening og ellers css selectors. Dette gjør det lettere å jobbe videre med testene i fremtiden. Vi la også til noen flere tester ettersom vi endret på noe av funksjonaliteten.

## Tekniske valg

### Apollo Client & Server

Vi valgte å bruke Apollo Server som graphql-server. Apollo Server har en veldig enkel setup og dette hjalp oss med å komme i gang raskt.

På frontend bruker vi Apollo Client for å konsumere graphql-apiet og som state-management-bibliotek.

### MongoDB og Prisma

Databasen vår er et MongoDB replica set som kjører på en virtuell maskin. For interaksjon mellom backenden og databasen, har vi valgt å bruke Prisma. Prisma er en ORM som gjør det enkelt å koble seg opp mot en database, skrive queries, endre på databasestrukturen, samt inspisere og redigere innhold i databasen.

### Tailwind CSS og DaisyUI

For styling av brukergrensesnittet har vi brukt Tailwind CSS med DaisyUI. Tailwind CSS gjør det raksere og enklere å jobbe med CSS, mens DaisyUI inneholder en rekke ferdiglagde UI-komponenter. Denne kombinasjonen har gjort oss i stand til å produsere et moderne og clean brukergrensesnitt med et minimalt antall kodelinjer og arbeidstimer.

### Andre eksterne biblioteker og komponenter

## Bærekraftig webutvikling

Apollo client cacher resultatet av queries automatisk, noe som reduserer internet-trafikk og strømbruk.

Hvis vi skulle redusert antall queries så kunne vi laget et "fetch" knapp som bare refetchet når man trykker på den. Som vi har det nå så refetcher siden automatisk hver gang du endrer på en filtreringsinstilling, og for hver bokstav du skriver i søkefeltet. Selv med Apollo sin caching kan dette bli en del queries. Vi mener imidlertid at dette gir en veldig god brukeropplevelse. Vi har også redusert antall queries ved at slideren bare refetcher når du slipper musen, istedenfor hver gang den flytter på seg, ettersom det hadde blitt ekstremt mange queries.

Noe som riktignok bør nevnes er at DaisyUI er et ganske stort bibliotek (Unpacked Size 2.17 MB), noe som går på bekostning av bærekraftig webutvikling. Vi mener likevel at fordelene av dette utveier ulempene med tanke på den økte produktiviteten gruppen har oppnådd gjennom bruk av dette biblioteket.

Selv om vi bruker et ganske stort bibliotek i DaisyUI, har gruppen gjennom prosessen prøvd å ta hensyn til størrelse på bibliotekene vi har tatt i bruk. Vi bruker også ingen eksterne fonter, ettersom vi anser dette som unødvendig bruk av strøm. Vi har også valgt å holde oss til mørke farger i brukergrensesnittet, ettersom dette sparer strøm.

## Universell utforming og accessibility

Vi har testet universell utforming og accessibility med verktøyet "axe dev-tools". For å forbedre brukervennlighet har vi gjort slider-knappene ekstra store og lagt til beskrivelse av SVG ikonene, lagt til aria-labels og roller på ulike HTML elementer. Vi har også designet siden slik at det eneste elementet på siden som kan scrolles er hele siden, slik at brukere som kun kan benytte tastatur ikke trenger å måtte selektere et element for å scrolle. Ikonene på bok-siden hjelper også de som ikke forstår engelsk så godt. Vi kunne nok ha økt kontrasten på noe av teksten og søkefeltet for å gjøre dem mer synlig, men vi likte fargene så godt som de var at vi mente at en bedre løsning hadde vært å lage en høykontrasts-modus, noe som vi ikke fikk tid til. Et annet forbedringspotensialet som hadde redusert behovet for motorikk hadde vært å gjøre slik at man kunne trykke et sted på slideren og så ville den nærmeste knappen automatisk gå dit du trykker.

## Testing

### Enhetstesting

For enhetstesting har vi brukt react-testing-libary. Slikt kan man enkelt teste komponenter slik en bruker ville interagert med de. Vi har også brukt Mockedprovider for å egendefinere mock-data fra queries som blir kjørt i testen.
Enhetstestene tester om bok-componenten innholder mockdataen og matcher utformingen i snapshot bildet. Den tester om hjemknappen fungerer som den ska. Kommentarfunksjonaliteten blir også testet ved at verdien til inputfeltet må være likt med mockdataen. Andre enhetstester er gjort på tabellen om denne inneholder mockdata og matcher utformingen til snapshotbildet.

### End-2-End testing

Vi bruker Cypress som vårt web testing rammeverk. Grunnlaget for dette er at det er et veldig lett rammeverk å bruke når man skal skrive end-2-end(e2e) tester, og man kan bruke en GUI de tilbyr som viser hvor og hvorfor testen feiler. I tillegg lages det videoer av testene så man kan se de i ettertid om man ønsker.

Hensiktet med testene er at å sjekke at applikasjonen funker som den skal når en sluttbruker vil gå fra et endepunkt av applikasjonen til et annet endepunkt.

Måten vi e2e tester applikasjonen er at testene utfører scenarioer som en sluttbruker vil utføre når brukeren bruker applikasjonen. Vi tester altså om applikasjonen funker som den skal ved bruk av de ulike funksjonalitetene. Et eksempel på dette er at om man velger italiensk som språk og trykker på den øverste boken, så skal man bli videresendt til informasjonsiden om boken "The Divine Comedy".

For å kjøre testene må du kjøre appen som vist i **_Hvordan kjøre appen?_** og deretter kjøre denne koden i terminalen:

```
$ cd frontend
$ ./node_modules/.bin/cypress run
```

Dersom du trenger mer informasjon om hvordan man skal laste ned cypress eller kjøre testene lokalt kan du sjekke ut denne linken: [Installing Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress#What-you-ll-learn)

På grunn av timeout issues så kan det være at noen tester feiler, så dersom det skjer, kjør de igjen.

## Browserouter / Hashrouter

Gruppen ble nødt til å bytte Router fra BrowserRouter til HashRouter i siste liten, ettersom vi ikke fikk BrowserRouter til å fungere med Apache. Derfor eksisterer det en bug på Bok-siden som gjør at man får en error om man refresher.

# Teknisk info

### Hvordan kjøre appen?

```
$ cd backend
$ npm install
$ npx prisma generate
$ npm start

# Nytt terminalvindu
$ cd frontend
$ npm install
$ npm start
```

### Hvordan bruke prisma?

```
$ cd backend
$ npx prisma generate

# for prisma studio på localhost:5555 ->
$ npx prisma studio"
```
