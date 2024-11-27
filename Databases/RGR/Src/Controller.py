from View import View
from Database import Database
from Command import *

class Controller:
    __instance = None

    @staticmethod
    def get_instance():
        if Controller.__instance is None:
            Controller.__instance = Controller()
        return Controller.__instance

    def __init__(self):
            self.db = Database("postgres", "postgres", "1111", "localhost", "5432")
            self.view = View()
            self.selectedDB = 'unspecified'
    
    def run(self):
          while True:
                try:
                    commandString = self.view.proccessCommand(self.selectedDB)
                    command = CommandFactory.createCommand(commandString, self)

                    res = None

                    if command is not None:
                        res = command.execute()

                    if res == 'exit':
                        break

                    if res is not None:
                        self.view.print(res)
                        if commandString.lower().startswith('select ') or commandString.lower().startswith('s '):
                            self.view.print(command.getExecutionTime().lstrip())

                    self.db.db.commit()

                except:
                     self.view.print("Incrorect command syntax")
