class YeuThichController{
	//[POST] /api/YeuThich
    async postYeuThich(req, res, next) {
		console.log(req.body);
		const yeuthichsearch = await YeuThich.findOne({ "salon_id": req.body.id, "user_id": req.body.userId });

		if (yeuthichsearch) {
			console.log("da co yeu thichj")
			// // const userId = yeuthichsearch['user_id'];
			// const user = await User.findOne({'_id': new ObjectId(userId)})
			const idYeuThich = await yeuthichsearch['_id'];
			await YeuThich.deleteOne({ '_id': idYeuThich })
			res.send({
				"success": true,
				"message": "unloved"
			})
		}
		else {
			console.log("chua co yeu thich");
			const data = {
				"user_id": req.body.userId,
				"salon_id": req.body.id
			}

			const yeuthichCreate = await new YeuThich(data);
			await yeuthichCreate.save();
			res.send({
				"success": true,
				"message": "loved",
				"yeuthich": yeuthichCreate
			})

		}
	}
}
module.exports = new YeuThichController();