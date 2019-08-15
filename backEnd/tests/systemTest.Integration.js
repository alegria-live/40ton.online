const db = require("../utils/dbConnection"),
	expect = require('expect'),
	request = require('supertest'),
	logIn = require('../log/logins'),
	app = require('../app').app;
let hashedId,
	userId,
	session,
	ext_cookie,
	int_cookie,
	testEmail,
	truckId = "testTruckId",
	driverId = "testDriverId";

describe('SERVER SIDE APLICATION MOCHA TESTS', () => {
	ext_cookie = process.env.EXT_COOKIE;
	int_cookie = process.env.INT_COOKIE;
	testEmail = process.env.eUser;
	it('GET / - expect status 200', (done) => {
		request(app)
			.get('/es')
			.expect(200, done)
	});

	it('POST /user - add new user - expect status 200', (done) => {
		db.initDb((err, db) => {
			request(app)
				.post('/api/user')
				.set('Cookie', ext_cookie)
				.send({
					dataSet: {
						name: "testName",
						lastName: "testLastName",
						company: "testCompany",
						nip: "9999999999",
						street: "testStreet",
						city: "testCity",
						post: "666",
						country: "testCountry",
						email: testEmail,
						password: "secretpass",
						date: new Date().getTime(),
						workers: [],
						orders: [],
						invoices: [],
						activ: 0,
						permission: 1
					},
					_csrf: int_cookie
				})
				.expect(200)
				.end((err, res) => {
					if (err) { return; }
					hashedId = res.headers._gcn;
					done();
				});
		});
	}).timeout(25000);

	it('POST /user - add user with existing email & nip expect status 503 & res 463', (done) => {
		request(app)
			.post('/api/user')
			.set('Cookie', ext_cookie)
			.send({
				dataSet: {
					name: "testName",
					lastName: "testLastName",
					company: "testCompany",
					nip: "9999999999",
					street: "testStreet",
					city: "testCity",
					post: "666",
					country: "testCountry",
					email: testEmail,
					password: "secretpass",
					date: new Date().getTime(),
					workers: [],
					orders: [],
					invoices: [],
					activ: 0,
					permission: 1
				},
				_csrf: int_cookie
			})
			.expect(500)
			.end((err, res) => {
				if (err) { return console.log(err) }
				expect(res.text).toBe("463");
				done();
			});
	});

	it('POST /activation - expect status 200', (done) => {
		request(app)
			.put('/activation')
			.send({ id: hashedId })
			.expect(200, done);
	}).timeout(25000);

	it('POST /login - expect status 202', (done) => {
		request(app)
			.post('/login')
			.set('Cookie', ext_cookie)
			.send({ email: testEmail, password: "secretpass", _csrf: int_cookie })
			.expect(202)
			.end((err, res) => {
				userId = res.headers['set-cookie'][0].substr(5, 24);
				session = res.headers['set-cookie'][1].slice(8);
				done();
			});
	}).timeout(25000);
	
	it('POST /login - incorrect password - expect status 503', (done) => {
		request(app)
			.post('/login')
			.set('Cookie', ext_cookie)
			.send({ email: testEmail, password: "xxx", _csrf: int_cookie })
			.expect(503, done);
	}).timeout(25000);

	it('POST /addTruck - expect status 200 & res === testId', (done) => {
		request(app)
			.post('/system/addTruck')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				id: truckId, Truck: {
					name: "testTruckName",
					norm: 0.4,
					consum: 24,
					date: new Date().getDate(),
					routes: [],
					fuel: [],
					paid: parseInt((Date.now() + ((new Date().getDate() + 61) * 86400000)))
				},
				collectionName: hashedId
			})
			.expect(200).
			end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body).toBe(truckId);
				done();
			});
	});

	it('PUT /update - update Truck - expect status 200 & res.body.value._id === truckId', (done) => {
		request(app)
			.put('/system/update')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				id: truckId,
				newData: {
					"Truck.name": "testTruck",
					"Truck.norm": 0.4,
					"Truck.consum": 25
				},
				collectionName: hashedId
			})
			.expect(200).
			end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body).toEqual(truckId);
				done();
			});
	});

	it('POST /addDriver - expect status 200 & res === testId', (done) => {
		request(app)
			.post('/system/addDriver')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				id: driverId, Driver: {
					name: "testDriver",
					lastName: "testLastName",
					document: "testDocument",
					date: Date.now(),
					routes: []
				},
				collectionName: hashedId
			})
			.expect(200).
			end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body.id).toBe(driverId);
				done();
			});
	});

	it('PUT /update - update Driver - expect status 200 & res.body.value._id === driverId', (done) => {
		request(app)
			.put('/system/update')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				id: driverId,
				newData: {
					"Driver.name": "testDriver",
					"Driver.lastName": "testLastName",					
				},
				collectionName: hashedId
			})
			.expect(200).
			end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body).toEqual(driverId);
				done();
			});
	});

	it('POST /addWorker - expect status 200 & res === name lastName', (done) => {
		request(app)
			.post('/api/workers/addWorker')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				dataSet: {
					name: "testWorker",
					lastName: "testLastNameWorker",
					email: "test@EmailWorker.com.test",
					password: "testWorkerPassword"
				},
				collectionName: hashedId
			})
			.expect(200).
			end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body).toBe("testWorker testLastNameWorker");
				done();
			});
	});

	it('POST /addWorker - with existing email- expect status 500 & res 467', (done) => {
		request(app)
			.post('/api/workers/addWorker')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				dataSet: {
					name: "testWorker",
					lastName: "testLastNameWorker",
					email: "test@EmailWorker.com.test",
					password: "testWorkerPassword"
				},
				collectionName: hashedId
			})
			.expect(500).
			end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body).toEqual(467);
				done();
			});
	});

	it('POST /login - new user loging - expect status 202', (done) => {
		request(app)
			.post('/login')
			.set('Cookie', ext_cookie)
			.send({
				email: "test@EmailWorker.com.test",
				password: "testWorkerPassword",
				_csrf: int_cookie
			})
			.expect(202, done);
	});

	it('PUT /editWorker - expect status 200 & res === testWorker testLastNameWorker', (done) => {
		request(app)
			.put('/api/workers/editWorker')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				newData: {
					name: "testWorker",
					lastName: "testLastNameWorker",
					email: "test@EmailWorker.com.test",
					password: "testWorkerPassword"
				},
				collectionName: hashedId,
				id: "test@EmailWorker.com.test"
			})
			.expect(200).
			end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body).toBe("testWorker testLastNameWorker");
				done();
			});
	});

	it('DELETE /delWorker - expect status 200 & res === 1', (done) => {
		request(app)
			.delete('/api/workers/delWorker')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				collectionName: hashedId,
				id: "test@EmailWorker.com.test"
			})
			.expect(200).
			end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body).toEqual(1);
				done();
			});
	});

	it('PUT /users - expect status 200', (done) => {
		request(app)
			.put('/api/users')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				_id: userId,
				dataSet: {
					name: "testNewName",
					lastName: "testNewLastName",
					company: "testNewCompany",
					nip: 9999999999,
					street: "testStreet",
					city: "testCity",
					post: "666",
					country: "testCountry",
					email: testEmail,
					password: "secretpass"
				}
			})
			.expect(200)
			.end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.text).toBe('200');
				done();
			});
	});

	it('POST /orders - expect status 200', (done) => {
		request(app)
			.post('/system/orders')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({ _id: userId })
			.expect(200, done);
	});

	it('GET /system/truckRoutes - expect status 200', (done) => {
		request(app)
			.get('/system/truckRoutes?truckId='+truckId)
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			
			.expect(200, done);
	});

	it('POST /driver/owner/:id - first fuel - expect status 200 & res truckId = truckId', (done) => {
		request(app)
			.post(`/system/owner/${userId}`)
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				add: 1,
				correct: 0,
				country: "PL",
				driverId: driverId,
				dtStop: "2019-02-01",
				fuel_Id: -1,
				full: 1,
				kmStop: 0,
				litres: 100,
				postal: "95-200",
				tonOut: 0,
				truckId: truckId,
				type: 3,
				_id: 0
			})
			.expect(200)
			.end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body.truckId).toBe(truckId);
				done();
			});
	});

	it('POST /driver/owner/:id - first load - expect status 200 & res truckId = truckId', (done) => {
		request(app)
			.post(`/system/owner/${userId}`)
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				add: 1,
				correct: 0,
				country: "PL",
				driverId: driverId,
				dtStop: "2019-02-01",
				fuel_Id: 0,
				full: 0,
				kmStop: 100,
				litres: 0,
				postal: "95-200",
				tonOut: 10,
				truckId: truckId,
				type: 1,
				_id: 1
			})
			.expect(200)
			.end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body.truckId).toBe(truckId);
				done();
			});
	});

	it('POST /driver/owner/:id - second load - expect status 200 & res truckId = truckId', (done) => {
		request(app)
			.post(`/system/owner/${userId}`)
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				add: 1,
				correct: 0,
				country: "PL",
				driverId: driverId,
				dtStop: "2019-02-01",
				fuel_Id: 0,
				full: 0,
				kmStop: 200,
				litres: 0,
				postal: "95-200",
				tonOut: 14,
				truckId: truckId,
				type: 1,
				_id: 2
			})
			.expect(200)
			.end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body.truckId).toBe(truckId);
				done();
			});
	});

	it('POST /driver/owner/:id - first unload - expect status 200 & res truckId = truckId', (done) => {
		request(app)
			.post(`/system/owner/${userId}`)
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				add: 1,
				correct: 0,
				country: "PL",
				driverId: driverId,
				dtStop: "2019-02-01",
				fuel_Id: 0,
				full: 0,
				kmStop: 300,
				litres: 0,
				postal: "95-200",
				tonOut: 10,
				truckId: truckId,
				type: 2,
				_id: 3
			})
			.expect(200)
			.end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body.truckId).toBe(truckId);
				done();
			});
	});

	it('POST /driver/owner/:id - second unload - expect status 200 & res truckId = truckId', (done) => {
		request(app)
			.post(`/system/owner/${userId}`)
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				add: 1,
				correct: 0,
				country: "PL",
				driverId: driverId,
				dtStop: "2019-02-01",
				fuel_Id: 0,
				full: 0,
				kmStop: 400,
				litres: 0,
				postal: "95-200",
				tonOut: 0,
				truckId: truckId,
				type: 2,
				_id: 4
			})
			.expect(200)
			.end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body.truckId).toBe(truckId);
				done();
			});
	});

	it('DELETE /system/owner/delRoute - expect status 200 & res truckId = truckId', (done) => {
		request(app)
			.delete('/system/owner/delRoute')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				collectionName: hashedId,
				truckId: truckId,
				id: 4,
				fuel_Id: 0,
				driverId: driverId
			})
			.expect(200).
			end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body.truckId).toEqual(truckId);
				done();
			});
	});

	it('POST /driver/owner/:id - second unload - expect status 200 & res truckId = truckId', (done) => {
		request(app)
			.post(`/system/owner/${userId}`)
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				add: 1,
				correct: 0,
				country: "PL",
				driverId: driverId,
				dtStop: "2019-02-01",
				fuel_Id: 0,
				full: 0,
				kmStop: 400,
				litres: 0,
				postal: "95-200",
				tonOut: 0,
				truckId: truckId,
				type: 2,
				_id: 4
			})
			.expect(200)
			.end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body.truckId).toBe(truckId);
				done();
			});
	});

	it('POST /driver/owner/:id - second fuel - expect status 200', (done) => {
		request(app)
			.post(`/system/owner/${userId}`)
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				add: 1,
				correct: 0,
				country: "PL",
				driverId: driverId,
				dtStop: "2019-02-01",
				fuel_Id: -1,
				full: 1,
				kmStop: 500,
				litres: 150,
				postal: "95-200",
				tonOut: 0,
				truckId: truckId,
				type: 3,
				_id: 5
			})
			.expect(200, done)
	});

	it('POST /driver/owner/:id - third load - expect status 200 & res truckId = truckId', (done) => {
		request(app)
			.post(`/system/owner/${userId}`)
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({
				add: 1,
				correct: 0,
				country: "PL",
				driverId: driverId,
				dtStop: "2019-02-01",
				fuel_Id: 0,
				full: 0,
				kmStop: 600,
				litres: 0,
				postal: "95-200",
				tonOut: 24,
				truckId: truckId,
				type: 1,
				_id: 6
			})
			.expect(200)
			.end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body.truckId).toBe(truckId);
				done();
			}).timeout(25000);
	});
	

	it('GET /system/activeDrivers - expect status 200 ', (done) => {
		request(app)
			.get('/system/activeDrivers')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])			
			.expect(200)
			.end((err, res) => {
				if (err) { return console.log(err); }
				expect(res.body[0]._id).toBe(driverId);				
				done();
			});
	});

	it('PUT /api/user/psw - change password - expect status 200', (done) => {
		request(app)
			.put('/api/user/psw')
			.set('Cookie', ext_cookie)
			.send({ email: testEmail, _csrf: int_cookie })
			.expect(200, done);
	}).timeout(9000);

	it('DELETE /users - expect status 200', (done) => {
		request(app)
			.delete('/api/users')
			.set('Cookie', [`_gcn=${userId}`, `session=${session}`])
			.send({ _id: userId })
			.expect(200, done);
	}).timeout(25000);
});