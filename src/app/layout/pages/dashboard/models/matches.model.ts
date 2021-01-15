export class Matches {
    name: string;
    age: string;
    height: string;
    id: string;
    matrimonyId: string;
    image: string;
    occupation: string;
    location: string;
    constructor(payload) {
        this.name = payload.name;
        this.age = payload.age;
        this.height = payload.height;
        this.id = payload.id;
        this.matrimonyId = payload.matrimonyId;
        this.image = payload.imagePath + '/small/' + payload.profileImage;
        this.id = payload.id;
        this.location = payload.birthPlace || '';
    }
}
