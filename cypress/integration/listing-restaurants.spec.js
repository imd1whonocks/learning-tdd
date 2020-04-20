describe('Listing of Restaurants', () => {
	it('shows restaurants from api', () => {
		const sushi = 'Sushi Place';
		const pizza = 'Pizza Place';

		cy.server({force404: true});
		cy.route({
			method: 'GET',
			url:
				'https://api.outsidein.dev/e9wqUy7ItMPMMjoWOtBBmdEdlCYhv1l8/restaurants',
			response: [
				{id: 1, name: sushi},
				{id: 2, name: pizza},
			],
		});
		cy.contains(sushi);
		cy.contains(pizza);
	});
});
