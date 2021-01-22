export default class Rulebook {

	constructor(piece, startingFieldId, passivePieace = null) {

	this.piece = piece;
	this.startingFieldId = parseInt(startingFieldId);
	this.passivePieace = passivePieace;

	this.fakeFields = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
		19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99, 100, 101, 102,
		103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119 ];
	}

	allowedFields() {

	let fields = [];

	switch(this.piece.type) {
	case 'queen':

		let directions = [1, 9, 10, 11];

		/* loop over possible directions */
		for (let x = 0; x < directions.length; x++) {

		/* loop over fields in direction max 8 for the queen */
			for(let i = 1; i < 8; i++) {
				let testField = this.startingFieldId + directions[x] * i;

				/* if the field is not on the board, stop iteration */
				if(this.fakeFields.includes(testField)) { break; }

				let ontheWay = this.hasPiece(testField);

				if (ontheWay != null) {
					if(this.sameColor(ontheWay)) {
						break;
					}
					fields.push(testField);
					break;
				}
 		}

		for(let i = 1; i < 8; i++) {
			let testField = this.startingFieldId - directions[x] * i;

				if(this.fakeFields.includes(testField)) { break; }
					let ontheWay = this.hasPiece(testField);
					if (ontheWay != null){
						if(this.sameColor(ontheWay)) {
							break;
						}
					if(this.passivePieace != null) {
						if(ontheWay.id === this.passivePieace.$el.id) {
							fields.push(testField);
							continue;
						} else {
							fields.push(testField);
							break;
						}
					}
				}
				fields.push(testField);
			}
		}
		break;
	case 'king':
		for(let i = 1; i < 2; i++) {

		let directions = [1, 9, 10, 11];

		for (let x = 0; x < directions.length; x++) {

			for(let i = 1; i < 2; i++) {
			let testField = this.startingFieldId + directions[x] * i;

 	    	if(this.fakeFields.includes(testField)) { break; }
			let ontheWay = this.hasPiece(testField);
			if (ontheWay != null) {
				if(this.sameColor(ontheWay)) {
					break;
				} else 	{
					fields.push(testField);
					break;
				}
			}
			fields.push(testField);
		}

		for(let i = 1; i < 2; i++) {
		let testField = this.startingFieldId - directions[x] * i;

		if(this.fakeFields.includes(testField)) { break; }
		let ontheWay = this.hasPiece(testField);
		if (ontheWay != null)
			{
			if(this.sameColor(ontheWay)) {
				break;
			} else 	{
				fields.push(testField);
				break;
				}
			}
				fields.push(testField);
				}
			}
		}
			break;

	case 'rook':

		for(let i = 1; i < 8; i++) {

		let directions = [1, 10];

		for (let x = 0; x < directions.length; x++) {

		for(let i = 1; i < 8; i++) {
		let testField = this.startingFieldId + directions[x] * i;
 		if(this.fakeFields.includes(testField)) { break; }
		let ontheWay = this.hasPiece(testField);
		if (ontheWay != null)
			{
			if(this.sameColor(ontheWay)) {
			break;
			}
			else if(ontheWay.id === this.piece.$el.id)
			{
 			    fields.push(testField);
				continue;
			}
			else {
				fields.push(testField);
				break;
				}
			}
		fields.push(testField);
		}

		for(let i = 1; i < 8; i++) {
		let testField = this.startingFieldId - directions[x] * i;

		if(this.fakeFields.includes(testField)) { break; }
		let ontheWay = this.hasPiece(testField);
		if (ontheWay != null)
			{
			if(this.sameColor(ontheWay)) {
				break;
			} else 	{
				fields.push(testField);
				break;
				}
			}
		 fields.push(testField);
		   }
		  }
		}
			break;
	case 'bishop':
		for(let i = 1; i < 8; i++)
			{
			let directions = [9, 11];
			for (let x = 0; x < directions.length; x++)
				{
				for (let i = 1; i < 8; i++)
					{
					let testField = this.startingFieldId + directions[x] * i;
					if (this.fakeFields.includes(testField))
						{
						break;
						}
					let ontheWay = this.hasPiece(testField);
					if (ontheWay != null)
						{
						    if(this.sameColor(ontheWay)) {
							break;
						} else 	{
							fields.push(testField);
							break;
							}
						}
					fields.push(testField);
					}

				for (let i = 1; i < 8; i++)
					{
					let testField = this.startingFieldId - directions[x] * i;

					if (this.fakeFields.includes(testField))
						{
						break;
						}
					let ontheWay = this.hasPiece(testField);
					if (ontheWay != null)
						{
                            if(this.sameColor(ontheWay)) {
	                             break;
                            } else 	{
								fields.push(testField);
								break;
								}
 						    }
					fields.push(testField);
					}
				}
			}

	case 'pawn':

		let steps = [9, 10, 11];

		steps.forEach((step) => {
		if (this.piece.color === 'white') {
			fields.push(this.startingFieldId - step);
			} else {
			fields.push(this.startingFieldId + step);
			}
		})
			break;

	case 'knight':
		let knightSteps = [21, 19, 12, 8, -21, -19, -12, -8];

		knightSteps.forEach((step) => {
			if (this.piece.color === 'white') {
			fields.push(this.startingFieldId - step);
			} else {
			fields.push(this.startingFieldId + step);
			}
		})
		break;

	default:
		// code block
	}
	return fields;
	}

	hasPiece(fieldId) {
	   let el = document.getElementById(fieldId);
       let nodes = el.childNodes;

         for (let i = 0; i < nodes.length; i++) {
          if(nodes[i].tagName === 'IMG') {
               return nodes[i];
           }
       }
    return null;
	}
	sameColor(node) {
 	 return (this.piece.color.charAt(0) === node.id.charAt(0));
	}

}