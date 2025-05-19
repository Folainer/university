from View import View

SUBCOMMAND_LIST = [
    "where"
]

class Argument:
    def __init__(self, view: View, argumentString: str):
        self.view = view
        self.argumentString = argumentString
        self.tokenizeComplexArgument()

    def tokenizeComplexArgument(self):
        self.checkSubcommand()
        if self.isSubcommand:
            self.proccessSubcommand()
        else:
            self.proccessTuple('"')

    def checkSubcommand(self):
        subcommand = self.argumentString.lstrip().split()[0]
        if subcommand.lower() in SUBCOMMAND_LIST:
            self.isSubcommand = True
        else:
            self.isSubcommand = False

    def proccessSubcommand(self):
        self.subcommand = " ".join(self.argumentString.split(' ')[1::])

    def proccessTuple(self, symbol):
        self.tupleList = self.argumentString.replace(' ', '').split(',')
        for i in range(len(self.tupleList)):
            if self.tupleList[i] == '*':
                self.tupleList[i] = f'{self.tupleList[i]}'
            elif self.tupleList[i].startswith("count"):
                self.tupleList[i] = f'{self.tupleList[i]}'
            elif self.tupleList[i].startswith("sum"):
                self.tupleList[i] = f'{self.tupleList[i]}'
            elif self.tupleList[i].startswith("min"):
                self.tupleList[i] = f'{self.tupleList[i]}'
            elif self.tupleList[i].startswith("max"):
                self.tupleList[i] = f'{self.tupleList[i]}'
            else:
                self.tupleList[i] = f'{symbol}{self.tupleList[i]}{symbol}'

    def getTupleString(self):
        return ",".join(self.tupleList)