// const express = require("express");
// const router = express.Router();
// const subscriber = require("../models/subscriber");

// //Get all
// router.get("/", async (req, res) => {
//   try {
//     const subs = await subscriber.find();
//     res.status(200).json(subs);
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// });

// //Get one
// router.get("/:id", findSubs, async (req, res) => {
//   try {
//     res.json(res.subscriber);
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// });

// //Creating one
// router.post("/", async (req, res) => {
//   const subs = new subscriber({
//     name: req.body.name,
//     subscribeToChannnel: req.body.subscribeToChannnel,
//   });

//   try {
//     const newSubs = await subs.save();
//     res.status(201).json(newSubs);
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// });

// //update one
// router.patch("/:id", findSubs, async (req, res) => {
// //   try {
// //     res.subscriber.name = req.body.name;
// //     res.subscriber.subscribeToChannnel = req.body.subscribeToChannnel;
// //     const newSubs = await res.subscriber.save();
// //     res.status(200).json(newSubs);
// //   } catch (err) {
// //     res.json({ message: err.message });
// //   }
//     if (req.body.name != null) {
//       res.subscriber.name = req.body.name;
//     }
//     if (req.body.subscribedToChannel != null) {
//       res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
//     }
//     try {
//       const updatedSubscriber = await res.subscriber.save();
//       res.json(updatedSubscriber);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
// });

// //delete one
// router.delete("/:id", findSubs, async (req, res) => {
//   try {
//     await res.subscriber.remove();
//     res.json({
//       message: "Deleted",
//     });
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// });

// async function findSubs(req, res, next) {
//   try {
//     const subs = await subscriber.findById(req.params.id);
//     console.log(subs);
//     if (subs == null) {
//       return res.status(400).json({ message: "no record" });
//     }
//     res.subscriber = subs;
//     next();
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// }

// module.exports = router;


const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// Creating one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;