const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const GodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    domains: [{
        type: String
    }],
    abode: {
        type: Schema.Types.ObjectId,
        ref: 'abode'
    },
    emblems: [{
        type: Schema.Types.ObjectId,
        ref: 'emblem'
    }],
    parents: [{
        type: Schema.Types.ObjectId,
        ref: 'god'
    }],
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'god'
    }],
    siblings: [{
        type: Schema.Types.ObjectId,
        ref: 'god'
    }]
});

GodSchema.statics.addRelative = (godId, relativeId, relationship) => {
    const God = mongoose.model('god');
    
    return God.find({
        '_id': { $in: [
            godId,
            relativeId
        ]}})
        .then(gods => {
            const god = godId === gods[0].id ? gods[0] : gods[1];
            const relative = relativeId === gods[0].id ? gods[0] : gods[1];

            switch (relationship) {
                case 'parent':
                    god.parents.push(relative);
                    relative.children.push(god);
                    break;
                case 'child':
                    god.children.push(relative);
                    relative.parents.push(god);
                    break;
                case 'sibling':
                    god.siblings.push(relative);
                    relative.siblings.push(god);
                    break;
            }

            return Promise.all([god.save(), relative.save()])
                .then(([god, relative]) => god);
        });
};

GodSchema.statics.removeRelative = (godId, relativeId, relationship) => {
  const God = mongoose.model('god'); 

  return God.find({
      '_id': { $in: [
          godId,
          relativeId
      ]}})
      .then(gods => {
        const god = godId === gods[0].id ? gods[0] : gods[1];
        const relative = relativeId === gods[0].id ? gods[0] : gods[1];

        switch (relationship) {
            case 'parent':
                god.parents.pull(relative);
                relative.children.pull(god);
                break;
            case 'child':
                god.children.pull(relative);
                relative.parents.pull(god);
                break;
            case 'sibling':
                god.siblings.pull(relative);
                relative.siblings.pull(god);
                break;
        }

        return Promise.all([god.save(), relative.save()])
            .then(([god, relative]) => god);
      });

    //   mutation($godId: ID, $relativeId: ID, $relationship: String) {
    //     removeGodRelative( godId: $godId, relativeId: $relativeId, relationship: $relationship) {
    //       name
    //     }
    //   }  
}; 

GodSchema.statics.addEmblem = (godId, emblemId) => {
    return God.findById(godId)
    .then(god => {
        god.emblems.push(emblemId);
        return god.save().then(god => god);
    });

    // mutation($godId: ID, $emblemId:ID) {
    //     addGodEmblem(godId: $godId, emblemId: $emblemId) {
    //       name,
    //       emblems {
    //         name
    //       }
    //     }
    //   }
}; 

GodSchema.statics.removeEmblem = (godId, emblemId) => {
    return God.findById(godId)
    .then(god => {
        god.emblems.pull(emblemId);
        return god.save().then(god => god);
    });
};

GodSchema.statics.updateAbode = (godId, abodeId) => {
    return God.findById(godId)
    .then(god => {
        god.abode = abodeId;
        return god.save().then(god => god);
    })

    // mutation($godId:ID, $abodeId:ID) {
    //     updateGodAbode(godId:$godId, abodeId:$abodeId) {
    //       name,
    //       abode {
    //         name
    //       }
    //     }
    //   }
};

GodSchema.statics.addDomain = (godId, domain) => {
    return God.findById(godId)
    .then(god => {
        god.domains.push(domain);
        return god.save().then(god => god);
    })
}; 

GodSchema.statics.removeDomain = (godId, domain) => {
    return God.findById(godId)
    .then(god => {
        god.domains.pull(domain);
        return god.save().then(god => god);
    })
}


module.exports = God = mongoose.model('god', GodSchema);
