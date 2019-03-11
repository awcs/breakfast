J’ai un store, un state général qui correspond à user, mes 23 participants.
Dans winners.jsx, chaque semaine je sélectionne le nombre de participants que je souhaite. Puis, je les préviens en leur envoyant un mail.
(je sais qu'il y a des erreurs, des actions sont gérées en front et en back, il faudra que je nettoie tout ça)

J’ai créer un second state, userNotSelected qui décrémente à chaque semaine (même si pour l’instant rien n’est enregistré).

Je souhaite pouvoir lire à nouveau la liste "users"(le state "users") quand le tableau usersNotSelected est vide, ou s’il ne reste pas assez de usersNotSelected. Cette dernière condition est importante.
Car aujourd'hui quand seules 2 personnes n'ont pas été sélectionnées, je ne peux sélectionner qu'elles.

Ce que l'on me demande c'est surtout de lire cette liste et que l'opération se fasse entre usersNotSelected et nombre de participants choisi.

Il faudait gérer ensuite la persistance des données.Car lorsque l'on redémarre l'appli, on repart de 0. Donc il faufait que chaque semaine, je puisse enregistrer les personnes sélectionnées.

