interface Data {
 category: string;
 description: string;
 id: number;
 image: string;
 price: number;
 title: string;
};

const itemData: Data[] = [
 {
  category: "Trinkets",
  description: "Astronauts use this pen in space and it can write upside down. Nowadays, it's popular amongst senior citizens. If Jack Klompus insists that you have this pen, take it and don't look back!",
  id: 1,
  image: "/Images/Astronaut_Pen.jpeg",
  price: 119.99,
  title: "Astronaut Pen",
 },
 {
  category: "Food",
  description: "The Big Salad is a popular lunch item at Monk's Cafe in New York City. It's not just any salad, it's a big salad! If someone orders one for you, just make sure to thank them for it (unlike Elaine).",
  id: 2,
  image: "/Images/Big_Salad.jpeg",
  price: 7.99,
  title: "Big Salad",
 },
 {
  category: "Collection",
  description: "A popular export from Cuba that's mainly enjoyed by golf players. The tobacco is so high-quality that you'll want to trade your most expensive jacket for one. If lit, please keep away from newspapers and head hair (unlike Kramer).",
  id: 3,
  image: "/Images/Cuban_Cigars.jpeg",
  price: 599.99,
  title: "Box of Cuban Cigars",
 },
 {
  category: "Miscellaneous",
  description: "The perfect car to buy for your elderly parents. This car is so expensive that Jack Klompus thinks that the only way to afford it is buy stealing money from the condo treasury. It got Morty Seinfeld impeached from the condo board and now it can be yours!",
  id: 4,
  image: "/Images/Cadillac_Fleetwood.jpeg",
  price: 75000.99,
  title: "Cadillac Fleetwood",
 },
 {
  category: "Books",
  description: "It's a coffee table book about coffee tables. It's not only filled with pictures and descriptions of coffee tables owned by celebrities, it can also fold out into a coffee table itself! The retractable coffee table legs are strong enough to support your hot coffee mugs, as seen on Regis and Kathie Lee.",
  id: 5,
  image: "/Images/Coffee_Table_Book.jpeg",
  price: 19.99,
  title: "Coffee Table Book About Coffee Tables",
 },
 {
  category: "Food",
  description: "This popular calzone from Paisano's is filled with mozzarella cheese, pepperoni, and eggplant parmesan. The pita pocket prevents the sauce from dripping! A favorite of George Steinbrenner, the owner of The New York Yankees, you'll have eggplant on your mind once you bite into one.",
  id: 6,
  image: "/Images/Eggplant_Calzone.jpeg",
  price: 9.99,
  title: "Eggplant Calzone",
 },
 {
  category: "Clothing",
  description: "Morty Seinfeld made his career selling these raincoats. The executive line is famous for being the first belt-less trenchcoat. They're a popular item at Rudy's Antique Boutique and now they can be yours, too!",
  id: 7,
  image: "/Images/Raincoat.jpeg",
  price: 119.99,
  title: "Executive Raincoat",
 },
 {
  category: "Miscellaneous",
  description: "The Festivus Celebration Kit comes with your very own festivus pole (which should be left unadorned) and a guide for performing the two principle rituals of Festivus: The Airing of Grievances and The Feats of Strength. Every year on December 23rd, you can forego the festivities of other holidays on the holiday season and celebrate a Festivus for the Rest of Us! As a bonus Festivus miracle, we've even included your very own donation to The Human Fund.",
  id: 8,
  image: "/Images/Festivus_Kit.jpeg",
  price: 49.99,
  title: "Festivus Celebration Kit",
 },
 {
  category: "Food",
  description: "Who's gonna turn down a Junior Mint? It's chocolate, it's peppermint, it's delicious! Just make sure not to eat them when watching a live operation, as they're small enough to fall into patients without notice.",
  id: 9,
  image: "/Images/Junior_Mints.jpeg",
  price: 3.99,
  title: "Junior Mints",
 },
 {
  category: "Food",
  description: "The famous Kenny Rogers's fire-roasted Roasters Chicken. The man makes a pretty strong bird, hot off the red planet. The family feast comes with steamed broccoli, a favorite of everyone (except Newman)!",
  id: 10,
  image: "/Images/Kenny_Rogers_Chicken.jpeg",
  price: 9.99,
  title: "Kenny Rogers Roasters Chicken",
 },
 {
  category: "Food",
  description: "The most popular bread at Schnitzer's Bakery, so much so, that they sell out by the end of the day! It's a great choice to bring over for dinner with your son's future in-laws. Just don't steal any from old ladies (unlike Jerry).",
  id: 11,
  image: "/Images/Marble_Rye_Loaf.jpeg",
  price: 5.99,
  title: "Loaf of Marble Rye",
 },
 {
  category: "Food",
  description: "Peaches from Oregon that are only ripe for two weeks a year. Eating them makes your taste buds come alive. It's like having a circus in your mouth!",
  id: 12,
  image: "/Images/Mackinaw_Peaches.jpeg",
  price: 2.99,
  title: "Mackinaw Peaches",
 },
 {
  category: "Miscellaneous",
  description: "Manya owned this pony back when she was a little girl in Poland in the early 20th century. Her sister had a pony and her cousin had a pony. If you insult him, then Manya will haunt your baseball games for years to come!",
  id: 13,
  image: "/Images/Pony.jpeg",
  price: 349.99,
  title: "Manya's Pony",
 },
 {
  category: "Food",
  description: "When people order muffins, they don't want to eat the stumps, they want the tops. Well now, you can just order the tops. Top of the Muffin to You!",
  id: 14,
  image: "/Images/Muffin_Tops.jpeg",
  price: 6.99,
  title: "Muffin Tops",
 },
 {
  category: "Food",
  description: "A frozen yogurt that's worth swearing about. It's non-fat (allegedly) and comes in a variety of different flavours, such as Chocolate, Vanilla, and Mango. When you eat one, you'll want another round of strawberry for you and your friends!",
  id: 15,
  image: "/Images/Non_Fat_Yogurt.jpeg",
  price: 5.99,
  title: "Non-Fat Yogurt",
 },
 {
  category: "Clothing",
  description: "As seen on The Today Show with Bryant Gumbel, this puffy shirt is mainly given away by Goodwill to clothe the homeless. Designed by Leslie the Low-Talker, this shirt was once opined to be the future fashion trend of America. It has a quality pirate feel to it.",
  id: 16,
  image: "/Images/Puffy_Shirt.jpeg",
  price: 3.99,
  title: "Puffy Shirt",
 },
 {
  category: "Miscellaneous",
  description: "A peephole you can put in your door, except the eye-view's are reversed. That way, you can see if anyone's home before knocking. One of Kramer's stranger innovations.",
  id: 17,
  image: "/Images/Reverse_Peephole.jpeg",
  price: 12.99,
  title: "Reverse Peephole",
 },
 {
  category: "Collection",
  description: "They're the perfect golf balls to hit on the beach. However, don't hit them into any whales, as it could obstruct their blowholes (and George, who isn't a marine biologist, will have to come and remove them). With a box of 20, you can buy them into the hundreds!",
  id: 18,
  image: "/Images/Titleist_Golf_Balls.jpeg",
  price: 19.99,
  title: "Titleist Golf Balls",
 },
 {
  category: "Books",
  description: "A TV Guide with Jerry Seinfeld on the cover himself. If you borrow one from Frank Costanza, don't leave it on the subway. It'll get turned into a paper bouquet!",
  id: 19,
  image: "/Images/TV_Guide.png",
  price: 11.99,
  title: "TV Guide",
 },
 {
  category: "Trinkets",
  description: "A pez dispenser based on Tweety Bird from Looney Tunes. Absolutely (not) appropriate to bring to a piano recital. Put this on your friend's lap and they'll laugh in the middle of the performance!",
  id: 20,
  image: "/Images/Pez_Dispenser.jpeg",
  price: 3.99,
  title: "Tweety Bird Pez Dispenser",
 }
];

export default itemData;