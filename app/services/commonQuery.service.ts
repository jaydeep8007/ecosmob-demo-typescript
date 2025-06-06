class commonQuery {
    private model;

    constructor(model: any) {
        this.model = model;
    }

    /* CREATE/SAVE/ADD DATA IN TABLE */
    async create(data: Record<string, any>): Promise<any> {
        try {
            const createdItem = await this.model.create(data);
            return createdItem;
        } catch (error) {
            throw error;
        }
    };

    /* GET ALL DATA FROM TABLE */
    async getAllData(): Promise<any[]> {
        try {
            const items = await this.model.find();
            return items;
        } catch (error) {
            throw error;
        }
    };

    /* GET SPECIFIC DATA AS FILTER FROM TABLE */
    async getData(filter = {}, projection = {}): Promise<any[]> {
        try {
            const items = await this.model.findOne(filter, projection);
            return items;
        } catch (error) {
            throw error;
        }
    };

    /* GET DATA BY ID FROM TABLE */
    async getDataById(id: string): Promise<any | null> {
        try {
            const item = await this.model.findById(id);
            return item;
        } catch (error) {
            throw error;
        }
    };

    /* DELETE DATA BY ID FROM TABLE */
    async deleteDataById(id: string): Promise<any | null> {
        try {
            const item = await this.model.findByIdAndDelete(id);
            return item;
        } catch (error) {
            throw error;
        }
    };

    /* UPDATE DATA IN TABLE */
    async updateData(data: Record<string, any>): Promise<any | null> {
        try {
            const item = await this.model.update(data);
            return item;
        } catch (error) {
            throw error;
        }
    };
}

export default commonQuery;