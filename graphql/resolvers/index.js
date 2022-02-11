const resolvers = {
    Query: {
        getAllVehicles() {
            return [
                {
                    makeId: '1',
                    makeName: 'something here',
                    vehicleTypes: [
                        {
                            typeId: '1*',
                            typeName: 'Something here*'
                        }
                    ]

                },
                {
                    makeId: '1',
                    makeName: 'something here',
                    vehicleTypes: [
                        {
                            typeId: '1*',
                            typeName: 'Something here*'
                        },
                        {
                            typeId: '1**',
                            typeName: 'Something here **'
                        }
                    ]

                },
                {
                    makeId: '2',
                    makeName: 'something There',
                    vehicleTypes: [
                        {
                            typeId: '2*',
                            typeName: 'Something There*'
                        }
                    ]

                }
            ]
        }
    }
}

export default resolvers;
