# Github Attach Release action

This action attaches a file to an existing Github release

## Inputs

### `repo_token`

**Required** Github token to use for creating the release

## `filename`

**Required** Name of the file to attach to the release

### `upload_url`

**Required** URL to use for uploading artifacts to the release

## Example usage

```yaml
uses: mobileposse/github-attach-release-action@v1
with:
  repo_token: ${{ secrets.GITHUB_TOKEN }}
  filename: [some_filename]
  upload_url: https://uploads.github.com/repos/[org]/[project]/releases/[release id]/assets{?name,label}
```

## Publishing

Compile a version of `index.js` that includes all dependencies

```
npx ncc build dist/index.js -o lib
```

## Local Testing

```
INPUT_REPO_TOKEN='your token here' GITHUB_REPOSITORY='org/repo' INPUT_VERSION=v1.0.0 INPUT_UPLOAD_URL=[upload_url] INPUT_FILENAME=[filename] node lib/index.js
```
