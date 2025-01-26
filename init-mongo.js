db = new Mongo().getDB("mydb")

db.createCollection('tasks', { capped: false });
db.createCollection('images', { capped: false });

db.tasks.insert([
  {
    _id: ObjectId('67964b05c2e2337d9e85d0ab'),
    status: 'completed',
    price: 12,
    originalPath: './test-images/cool-cat.webp',
    createdAt: ISODate('2025-01-26T14:47:33.523Z'),
    updatedAt: ISODate('2025-01-26T14:47:33.617Z'),
    images: [
      ObjectId('67964b05c2e2337d9e85d0ad'),
      ObjectId('67964b05c2e2337d9e85d0b2')
    ],
    __v: 2
  },
  {
    _id: ObjectId('67964b1cc2e2337d9e85d0b9'),
    status: 'completed',
    price: 37,
    originalPath: './test-images/image.png',
    createdAt: ISODate('2025-01-26T14:47:56.501Z'),
    updatedAt: ISODate('2025-01-26T14:47:56.612Z'),
    images: [
      ObjectId('67964b1cc2e2337d9e85d0bb'),
      ObjectId('67964b1cc2e2337d9e85d0c0')
    ],
    __v: 2
  },
  {
    _id: ObjectId('67964b2ec2e2337d9e85d0c5'),
    status: 'completed',
    price: 10,
    originalPath: './test-images/orange-cat-2.webp',
    createdAt: ISODate('2025-01-26T14:48:14.096Z'),
    updatedAt: ISODate('2025-01-26T14:48:14.163Z'),
    images: [
      ObjectId('67964b2ec2e2337d9e85d0c7'),
      ObjectId('67964b2ec2e2337d9e85d0cc')
    ],
    __v: 2
  },
  {
    _id: ObjectId('67964b37c2e2337d9e85d0d1'),
    status: 'completed',
    price: 40,
    originalPath: './test-images/orange-cat.jpg',
    createdAt: ISODate('2025-01-26T14:48:23.132Z'),
    updatedAt: ISODate('2025-01-26T14:48:23.159Z'),
    images: [
      ObjectId('67964b37c2e2337d9e85d0d3'),
      ObjectId('67964b37c2e2337d9e85d0d5')
    ],
    __v: 2
  },
  {
    _id: ObjectId('67964b49c2e2337d9e85d0dd'),
    status: 'completed',
    price: 41,
    originalPath: './test-images/two-cats.webp',
    createdAt: ISODate('2025-01-26T14:48:41.657Z'),
    updatedAt: ISODate('2025-01-26T14:48:41.741Z'),
    images: [
      ObjectId('67964b49c2e2337d9e85d0df'),
      ObjectId('67964b49c2e2337d9e85d0e4')
    ],
    __v: 2
  }
])

db.images.insert([
  {
    _id: ObjectId('67964b05c2e2337d9e85d0ad'),
    resolution: 800,
    md5: '91106a31027218737048840431628bba',
    path: './output/cool-cat/800/91106a31027218737048840431628bba.webp',
    task: ObjectId('67964b05c2e2337d9e85d0ab'),
    __v: 0
  },
  {
    _id: ObjectId('67964b05c2e2337d9e85d0b2'),
    resolution: 1024,
    md5: '5ff3fa85dd402634407aa17389cdb61a',
    path: './output/cool-cat/1024/5ff3fa85dd402634407aa17389cdb61a.webp',
    task: ObjectId('67964b05c2e2337d9e85d0ab'),
    __v: 0
  },
  {
    _id: ObjectId('67964b1cc2e2337d9e85d0bb'),
    resolution: 800,
    md5: 'ef685d6a3cd0d62b2bd7b318d28bfe5f',
    path: './output/image/800/ef685d6a3cd0d62b2bd7b318d28bfe5f.png',
    task: ObjectId('67964b1cc2e2337d9e85d0b9'),
    __v: 0
  },
  {
    _id: ObjectId('67964b1cc2e2337d9e85d0c0'),
    resolution: 1024,
    md5: 'e8f90f23ed42fb466c02e5f99a564faf',
    path: './output/image/1024/e8f90f23ed42fb466c02e5f99a564faf.png',
    task: ObjectId('67964b1cc2e2337d9e85d0b9'),
    __v: 0
  },
  {
    _id: ObjectId('67964b2ec2e2337d9e85d0c7'),
    resolution: 800,
    md5: '491bbe9871f1a20f1f3328c14d071986',
    path: './output/orange-cat-2/800/491bbe9871f1a20f1f3328c14d071986.webp',
    task: ObjectId('67964b2ec2e2337d9e85d0c5'),
    __v: 0
  },
  {
    _id: ObjectId('67964b2ec2e2337d9e85d0cc'),
    resolution: 1024,
    md5: 'a72d1a4a47a80b523ddcaadb0ed0643e',
    path: './output/orange-cat-2/1024/a72d1a4a47a80b523ddcaadb0ed0643e.webp',
    task: ObjectId('67964b2ec2e2337d9e85d0c5'),
    __v: 0
  },
  {
    _id: ObjectId('67964b37c2e2337d9e85d0d3'),
    resolution: 800,
    md5: 'ed09f7e23861f839b7f83a1c4059cd77',
    path: './output/orange-cat/800/ed09f7e23861f839b7f83a1c4059cd77.jpg',
    task: ObjectId('67964b37c2e2337d9e85d0d1'),
    __v: 0
  },
  {
    _id: ObjectId('67964b37c2e2337d9e85d0d5'),
    resolution: 1024,
    md5: 'f2e1e3e18a819c89b8aa2067ffe79dea',
    path: './output/orange-cat/1024/f2e1e3e18a819c89b8aa2067ffe79dea.jpg',
    task: ObjectId('67964b37c2e2337d9e85d0d1'),
    __v: 0
  },
  {
    _id: ObjectId('67964b49c2e2337d9e85d0df'),
    resolution: 800,
    md5: 'dc23645c0f9e01640c2c824fda41c4a1',
    path: './output/two-cats/800/dc23645c0f9e01640c2c824fda41c4a1.webp',
    task: ObjectId('67964b49c2e2337d9e85d0dd'),
    __v: 0
  },
  {
    _id: ObjectId('67964b49c2e2337d9e85d0e4'),
    resolution: 1024,
    md5: '7fca9f5ead00eb67c9432b55f7a0eaa3',
    path: './output/two-cats/1024/7fca9f5ead00eb67c9432b55f7a0eaa3.webp',
    task: ObjectId('67964b49c2e2337d9e85d0dd'),
    __v: 0
  }
])
