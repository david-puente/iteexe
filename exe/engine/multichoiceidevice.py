# ===========================================================================
# eXe 
# Copyright 2004-2005, University of Auckland
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
# ===========================================================================
"""
A multichoice Idevice is one built up from question and options
"""

import logging
from twisted.spread       import jelly
from exe.engine.idevice   import Idevice
from exe.engine.translate import lateTranslate
log = logging.getLogger(__name__)


# ===========================================================================
class Option(jelly.Jellyable):
    """
    A Multichoice iDevice is built up of question and options.  Each option can
    be rendered as an XHTML element
    """
    def __init__(self, answer="", isCorrect=False, feedback=""):
        """
        Initialize 
        """
        self.answer    = answer
        self.isCorrect = isCorrect
        self.feedback  = feedback


# ===========================================================================
class MultichoiceIdevice(Idevice):
    """
    A multichoice Idevice is one built up from question and options
    """
    persistenceVersion = 5

    def __init__(self, question=""):
        """
        Initialize 
        """
        Idevice.__init__(self,
                         x_(u"Multi-Choice Question"),
                         x_(u"University of Auckland"),
                         x_(u"""Although more often used in formal testing 
situations MCQs can be used as a testing tool to stimulate thought and  
discussion on topics students may feel a little reticent in responding to. 

When designing a MCQ test consider the following:
<ul>
<li> What are the learning outcomes are the questions testing</li>
<li>    What intellectual skills are being tested</li>
<li> What are the language skills of the audience</li>
<li> Gender and cultural issues</li>
<li> Avoid grammar language and question structures that might provide 
     clues</li>
</ul>
 """), x_(u"""When building an MCQ consider the following: <ul>
<li> Language use phrases that learners are familiar with and have 
encountered in their study </li>
<li> Keep responses concise </li>
<li> There should be some consistency between the stem and the responses </li>
<li> Provide enough options to challenge learners to think about their response
</li>
<li> Try to make sure that correct responses are not more detailed than the 
distractors </li>
<li> Distractors should be incorrect but plausible </li>
</ul>
"""), u"question")
        self.emphasis         = Idevice.SomeEmphasis
        self.question         = question
        self.hint             = ""
        self._hintInstruc     = x_(u"""Enter a hint here. If you
do not want to provide a hint, leave this field blank.""")
        self.options          = []
        self._questionInstruc = x_(u"Type the question stem.")
        self._keyInstruc      = x_(u"""To indicate the correct answer, click the 
radio button next to the correct option.""")
        self._answerInstruc   = x_(u"""Type in each option from which students 
must choose into the appropriate options box. You can add options by clicking 
on the "ADD ANOTHER OPTION" button. You can delete options by clicking on the 
"x" next to each option.""")
        self._feedbackInstruc = x_(u"""Type in the feedback that you want the 
student to see when selecting the particular option. If you don't complete this 
box, eXe will automatically provide default feedback as follows: "Correct 
answer" as indicated by the selection for the correct answer; or "Wrong answer"
for the other alternatives.""")
        
    # Properties
    hintInstruc     = lateTranslate('hintInstruc')
    questionInstruc = lateTranslate('questionInstruc')
    keyInstruc      = lateTranslate('keyInstruc')
    answerInstruc   = lateTranslate('answerInstruc')
    feedbackInstruc = lateTranslate('feedbackInstruc')

    def getResources(self):
        """
        Return the resource files used by this iDevice
        """
        return Idevice.getResources(self) + ["common.js", 
                                             "libot_drag.js",
                                             "panel-amusements.png",
                                             "stock-stop.png"]


    def addOption(self):
        """
        Add a new option to this iDevice. 
        """
        self.options.append(Option())


    def upgradeToVersion1(self):
        """
        Called to upgrade from 0.4 release
        """
        self.hint            = ""
        self.hintInstruc     = x_(u"""Enter a hint here. If you
do not want to provide a hint, leave this field blank.""")
        self.icon            = "multichoice"


    def upgradeToVersion2(self):
        """
        Upgrades the node from 1 (v0.5) to 2 (v0.6).
        Old packages will loose their icons, but they will load.
        """
        log.debug(u"Upgrading iDevice")
        self.emphasis = Idevice.SomeEmphasis
    
    def upgradeToVersion3(self):
        """
        Upgrades the node from 1 (v0.6) to 2 (v0.7).
        Change icon from 'multichoice' to 'question'
        """
        log.debug(u"Upgrading iDevice icon")
        self.icon = "question"
        
    def upgradeToVersion4(self):
        """
        Upgrades v0.6 to v0.7.
        """
        self.lastIdevice = False

    def upgradeToVersion5(self):
        """
        Upgrades to exe v0.10
        """
        self._upgradeIdeviceToVersion1()
        self._hintInstruc     = self.__dict__['hintInstruc']
        self._questionInstruc = self.__dict__['questionInstruc']
        self._keyInstruc      = self.__dict__['keyInstruc']
        self._answerInstruc   = self.__dict__['answerInstruc']
        self._feedbackInstruc = self.__dict__['feedbackInstruc']

# ===========================================================================
