# `rock:sail`

Counter-Strike 2 Asset Cheat

## Description

This is a cheat to manipulate your CS2 client, to get paid stuff for free. Others won't be able to see it, so you can't flex on them, but you can use it to get free skins, music kits and more.

## Features

- Music Kit Switcher: swap your music kit to any other one

More features will be added in the future.

## Installation

```bash
git clone https://github.com/Le0X8/rocksail.git
cd rocksail
pnpm i
```

1. Install Node.js, pnpm and git.
2. Install [VPKEdit](https://github.com/craftablescience/VPKEdit) and [VRF](https://github.com/ValveResourceFormat/ValveResourceFormat).
3. Rename `default.env` to `.env` and edit it with your own values. `VRFCLI_PATH` and `VPKEDITCLI_PATH` should point to the executables of VRF (CLI. not the GUI!) and VPKEdit, respectively. `DATA_PATH` is the path where the data files will be stored, and `STEAM_DIR` is the path to your game files (usually `~/.steam/steam/steamapps` on Linux or `C:\Program Files (x86)\Steam\steamapps` on Windows).
4. Builld the project with:

```bash
pnpm build
```

Done.

## Usage

Run the cheat with:

```bash
pnpm preview
```

Your game should not be running during this.

## FAQ

### Why can't I see the changes?

Maybe CS2 is still running. Restart it.

### An update removed the cheat, what do I do?

Just reapply the cheat. (see usage)

### How do I revert ALL changes?

1. Open your Steam client.
2. Go to Library.
3. Right-click on Counter-Strike 2, select Properties.
4. Go to Installed Files.
5. Click on "Verify integrity of game files". This will remove all changed files and download the original ones.

### Will I get banned for using this?

Probably not, as this is a cheat which won't give you an advantage over other players. Currently, VAC doesn't care about changed game files,
but as soon as it does, might get some trouble. Use at your own risk.
