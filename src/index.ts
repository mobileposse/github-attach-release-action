import * as core from '@actions/core'
import * as github from '@actions/github'
const mime = require('mime-types')
const fs = require('fs')
const path = require('path')

async function run() {
  try {
    const token = core.getInput('repo_token', { required: true })
    const filename = core.getInput('filename', { required: true })
    const uploadUrl = core.getInput('upload_url', { required: true })
    const client = github.getOctokit(token)

    await attachAsset(client, uploadUrl, filename)
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

const attachAsset = async (client, url: string, filename: string) => {
  const contentLength = fs.statSync(filename).size
  await client.rest.repos.uploadReleaseAsset({
    url,
    data: fs.readFileSync(filename),
    headers: {
      'content-type': mime.lookup(filename),
      'content-length': contentLength
    },
    name: path.basename(filename)
  })
}

run()
