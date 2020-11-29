import aws from 'aws-sdk'
import { v4 as uuid } from 'uuid'

const endpoint = new aws.Endpoint('snapchat.ams3.digitaloceanspaces.com')

export default async function (req, res) {
  const s3 = new aws.S3({
    endpoint,
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_ACCESS_SECRET,
  })

  const id = uuid()

  const snap = await s3.createPresignedPost({
    Bucket: 'snapchat',
    Fields: {
      key: `snaps/${id}`,
    },
    ACL: 'public-read',
    Expires: 60,
    Conditions: [
      ['content-length-range', 0, 1048576], // Max 1mb
    ],
  })

  res.status(200).json({ id, snap })
}
