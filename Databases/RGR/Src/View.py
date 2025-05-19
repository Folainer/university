import pprint

class View:
    def __init__(self):
        self.pp = pprint.PrettyPrinter(indent=4, width=80)

    def print(self, message: str):
        if type(message) is list:
            self.pp.pprint(message)
        else:
            print(message)

    def proccessCommand(self, database: str):
        print(f'[{database}]: ', end='')
        return input()