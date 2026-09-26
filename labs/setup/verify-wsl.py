"""Fail before image downloads if the intended VM budget is not effective."""
import os
import subprocess
from pathlib import Path

memory = {}
for line in Path('/proc/meminfo').read_text().splitlines():
    key, value = line.split(':', 1)
    memory[key] = int(value.split()[0]) * 1024
cpus = len(os.sched_getaffinity(0))
assert cpus <= 2, f'Expected at most 2 virtual CPUs, found {cpus}'
assert memory['MemTotal'] <= 4 * 1024**3, 'WSL memory ceiling exceeds 4 GiB'
assert memory['SwapTotal'] <= 1024**3, 'WSL swap ceiling exceeds 1 GiB'
root_device = subprocess.check_output(['findmnt', '-n', '-o', 'SOURCE', '/'], text=True).strip()
disk_bytes = int(subprocess.check_output(['lsblk', '-b', '-n', '-o', 'SIZE', root_device], text=True).strip())
assert disk_bytes <= 28 * 1024**3, (
    'Existing distro disk exceeds 28 GiB. Use a new dedicated distro; '
    'setup will not shrink an existing filesystem.'
)
print(f'WSL verified: {cpus} CPUs, {memory["MemTotal"]/1024**3:.2f} GiB RAM, '
      f'{memory["SwapTotal"]/1024**3:.2f} GiB swap, {disk_bytes/1024**3:.0f} GiB disk maximum.')
