const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
    //  BUILD QUERY
    //  1) Filtering
   try { 
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
    //  2) Advanced filtering 
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr)); 
    
    const query = Tour.find(JSON.parse(queryStr));

    //     EXECUTE QUERY
        const tours = await query;

     //    const tours = await Tour.find()
    //        .where('duration').equals(5)
    //        .where('difficulty').equals('easy');

    //  SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
            tours
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err 
         });
    }

}

exports.getTour = async (req, res) => {
   try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
   } catch (err) {
     res.status(400).json({
        status: 'fail',
        message: err 
    });
   }
};

exports.createTour = async (req, res) => {
    try {
        //  const newTour = new Tour({})
        //  newTour.save()

        const newTour = await Tour.create(req.body)

        res.status(201).json({
        status: 'success',
           data: {
           tours: newTour 
        }
        });
        } catch (err) {
        res.status(400).json({
           status: 'fail',
           message: err 
        });
    }
}
   
exports.updateTour = async (req, res) => {
try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
} catch {
    res.status(400).json({
        status: 'fail',
        message: err
    });
}
};


exports.deleteTour = async (req, res) => {
try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
    } catch {
    res.status(400).json({
        status: 'fail',
        message: err
    });
}
}