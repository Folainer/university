from Controller import Controller
import sys

global launch_mode

from Global import launch_mode


if len(sys.argv) > 1 and sys.argv[1].lower() == 'debug':
    launch_mode = 'debug'
else:
    launch_mode = 'release'


controller = Controller.get_instance()

controller.run()
