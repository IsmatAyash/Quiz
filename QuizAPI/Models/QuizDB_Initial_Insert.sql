USE [QuizDB]
GO
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (1, N'Operations')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (2, N'Cards')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (3, N'Charges, Fees, Commissions')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (4, N'Retail Products')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (5, N'Credit/Debit Interest, APR')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (6, N'Insurance')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (7, N'Transfers')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (8, N'Branch Operations')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (9, N'Western Union')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (10, N'Bancassurance')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (11, N'NGO Donation')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (12, N'Retail Credit')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (13, N'Loyalty Program')
INSERT [dbo].[Category] ([CategoryID], [CategoryName]) VALUES (14, N'Contact Center Operations')
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[Question] ON

INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (1, N'NULL', N'On 27/03/2019, Mr. Maalouf, a gold club member at BoB-Foch branch, received a wire transfer of $17,000 from Audi Bank.
On the same day, he executed an outgoing wire transfer of $8,000 to Mr. Haddad who is a BLC client (Thru online banking)
How much is the total amount charged for both operations? How did you calculate it?', N'$25
', N'$30', N'$20', N'$13', N'$24', 3, N'Since he is a Gold Club member; charges will be calculated as follows:

- Incoming Transfer: 15 USD since the amount is 10.000< amount <100.001 USD
- Outgoing Transfer thru online banking: $5 since it is an outgoing transfer inside Lebanon: 0 commission + 5 USD Swift

Total amount = $20', 7, 120, 1)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (2, N'q16.jpg', N'Mr. Khoury, a BoB client dealing with Bauchrieh branch and having a full package online banking user, got to execute wire transfers successfully. This time, while in Kuwait, he is not able to execute the wire transfer although all beneficiary details already exist in the beneficiary list. All transaction’s steps were successfully completed except for the OTP sms which was not received by Mr. Khoury, noting that he is receiving all other SMS normally from Bob. He was trying for the past three days unsuccessfully, and he called the contact center to ask for a solution because he must execute the wire transfer. What do you suggest as a solution:', N'To get another mobile number from Mr. Khoury and change it on system', N'Ask Mr. Khoury to sign a discharge letter at branch to remove the OTP sms on his own responsibility', N'After a proper authentication, to collect another mobile number from Mr. Khoury and send it to Bauchrieh branch, asking them to change it on system, based on the recorded call', N'Send to Mr. Khoury, by email, a discharge letter to remove the OTP sms on his own responsibility, asking him to sign it and send it back to the contact center', N'Send to Mr. Khoury, by email, a discharge letter to remove the OTP sms on his own responsibility, asking him to sign it and send it back to the branch', 4, NULL, 2, 180, 1)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (3, N'NULL', N'Mr. Khoury was not receiving OTP sms in kuwait, We assisted him and we sent by email, a discharge letter to remove the OTP sms on his own responsibility, asking him to sign it and send it back to the contact center.
What is the next step?

', N'We send the signed letter to the Information Security team (ISBC) in order to execute the OTP cancellation ', N'We remove the OTP feature from Business Central RSA Panel and inform ISBC accordingly', N'We send the signed letter to the related branch in order to get SV, and then if Signature Verified by return email from branch, we remove the OTP feature from Business Central', N'We remove the OTP feature from CRM - Security Panel and inform ISBC accordingly', N'We send the signed letter to the related branch in order to get SV, and then if Signature Verified by return email from branch, we send it to ISBC to execute the OTP cancellation and confirm back', 5, NULL, 2, 120, 1)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (4, N'q16.jpg', N'We assisted Mr. Khoury who has an OTP problem and 
ISBC cancelled the online banking OTP and informed the contact center, who informed the client that he can now execute transactions without receiving OTP.
What will be the security layer replacing the OTP?
', N'The user will be asked to select the predefined Picture and to type the displayed Captcha ', N'The user will be challenged by the RSA Security questions', N'Nothing will replace the OTP', N'A security code will be sent to his email address registered in the KYC instead of the OTP', N'A token number will be sent to his email address registered in the KYC, which will hold for 3 minutes to be typed', 2, NULL, 2, 60, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (5, N'q16.jpg', N'What is the maximum time to insert the OTP while using the IMobile', N'3 minutes', N'4 minutes', N'5 minutes', N'6 minutes', N'7 minutes', 5, NULL, 2, 20, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (6, N'q16.jpg', N'The 40Z account, is a new account that is being used for international incoming payment orders.
It is a 0 fees account ?', N'TRUE', N'FALSE', N'NULL', N'NULL', N'NULL', 1, NULL, 3, 10, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (7, N'NULL', N'Cash deposit in USD currency through the branch has a commission of 2‰ and 4 WD value', N'TRUE', N'FALSE', N'NULL', N'NULL', N'NULL', 2, NULL, 3, 10, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (8, N'q17.png', N'Mr. Tabet calls the contact center to block his daughter’s credit card linked to her personal account, stating that he was at the branch and settled the outstanding balance.
The card is with his daughter who is abroad, and he needs to block the card to avoid any future charges & interest, noting that the card is temporary blocked (block code O) because the card holder was not paying her dues. He requested from the branch to block the card and they asked him to call the contact center for such request.
What will you do?
', N'Ask to talk to the account and card holder in order to block the card, for security purpose', N'Block the card for security purpose since it is a critical issue', N'Inform Mr. Tabet that such action must be done at branch level after delivering the card to them; and if seems necessary call the account holder and explain same to her stating that the card is currently temporary blocked.', N'Apologize from Mr. Tabet informing him that the card is already blocked', N'Apologize from Mr. Tabet because he is not the account holder. Call the account holder, and block the card after proper authentication', 3, NULL, 1, 150, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (9, N'q16.jpg', N'Mr. Haddad a BOB client, has been enrolled on his joint account 654321 as a Full Package, noting that his wife is the co-holder.
Two months later, Mr. Haddad opened a single account at the same branch (Acc ID: 123456). 
When he went home, he accessed his existing user via i-mobile and requested to add his new single account ledger (1140212345600) as beneficiary to be able to transfer funds between his accounts.
You received the Add Beneficiary request on bobdirect;
What will you do?', N'Add the ledger as beneficiary without calling the client because he is the same holder for both accounts', N'Add the ledger as beneficiary, after calling his wife to get her approval (Team mentor to call the wife , as per contact center internal policy)', N'Ask Mr. Haddad to pass by his branch together with his wife to sign the related “Add Beneficiary” request form. After that, the branch will send us the request in order to execute accordingly.', N'Communicate with Mr. Haddad and explain to him that in such case, he must add his single account as secondary to the same existing online user, so that he can access his account online using the same username and execute fund transfers accordingly. 
In addition we can add the requested ledger if he insisted.', N'Send the “Add Beneficiary” request form to Mr. Haddad by email, asking him to print it, sign t together with his wife, scan it and send it back to bobdirect in order to proceed.', 4, NULL, 2, 150, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (10, N'q17.png', N'What is IVR?', N'Instant Voice Reply', N'Interactive Voice Machine', N'Intermediate Voice Response', N'Interactive Voice Response', N'Instant voice response', 4, NULL, 2, 15, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (11, N'NULL', N'In PACR, the C is for:', N'Certify', N'Cause', N'Clarify', N'Convert', N'Contact', 3, NULL, 14, 10, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (12, N'q17.png', N'What is CRPC?', N'Certified Right Party Covered', N'Covered Right Party Contacted', N'Converted Right Party Certified', N'Converted Right Party Contacted', N'Covered right party certified', 4, NULL, 14, 15, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (13, N'q17.png', N'What is FCR?', N'First Contact Reply', N'Final Contact Resolution', N'First Contact Resolution', N'First Call Response', N'Final Contact Response', 3, NULL, 14, 10, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (14, N'q16.jpg', N'What is Digi?', N'New concept for Digital Banking experience', N'New Digital Account at BOB', N'New Bank of Beirut mobile App ', N'New digital product', N'New account', 1, NULL, 1, 20, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (15, N'NULL', N'Which account can be opened with Digi?', N'Sight Maximizer', N'Saving Maximizer', N'Digital Maximizer', N'Saving Account', N'Digi account', 2, NULL, 1, 10, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (16, N'q16.jpg', N'Which service is not provided by Digi?', N'Open an account', N'Apply for personal loan', N'Apply for Digi Credit Card', N'Apply for SME Loan', N'Apply for car loan', 4, NULL, 1, 20, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (17, N'q17.png', N'Thru which channel can you withdraw / deposit money from the Saving Maximizer?', N'CCDM', N'CCDM, ATM, and POS', N'Branch and CCDM', N'Branch Only', N'Online & Mobile Banking', 1, NULL, 2, 20, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (18, N'q16.jpg', N'Mr. Chahine a BOB client, subscribed into the loyalty service and has around 100,000 pts.
On Sunday at 11 am, he logged in into Beirut rewards app, and booked a ticket from Beirut to Istanbul worth 80,000 pts.
After 1 hour, he realized that he made a wrong booking; it should be done to Adana instead of Istanbul, and it costs 83,000 pts.
He is insisting to cancel the first booking, and to refund back to his balance the 80,000 pts in order to make a new booking to the new destination.
After a full authentication, what should we do as contact center agent?
', N'Request a reversal  on BLU and let him wait till next day ( Monday ) so that the team mentor approve the refund request.', N'Contact BLU team on their office number to stop the reservation and send them an email copying BOBLoyalty team; and we act according to their reply.', N'Apologize to the client, inform him that there is nothing to do from our end since it’s is an irreversible transaction.', N'Send an email to BOBLoyalty team explaining the case, and inform the client that we should wait till tomorrow ( Monday ) in order to get an approval.', N'Inform the client to cancel the reservation manually through the app as long as it was made within the same day.', 2, NULL, 13, 120, 1)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (19, N'q17.png', N'What do you do if you have to ask a question to your mentor who is sitting on his desk away from you, and there are other colleagues supporting customers?', N'Put client on hold and go ask him your question', N'stay at your desk and ask him for his assistance loudly', N'Ask client permission for call back ', N'Put client on hold and call him on his extension', N'Ask your colleague near you', 4, NULL, 14, 30, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (20, N'q17.png', N'Mr. Ibrahim a non-BOB client, subscribed into the WU.com service, signed all related documents and got verified by bob finance.
Two weeks later, he created a transfer to Turkey for 400 USD to his friend.
He transferred the amount to BOB finance account and the transaction was released.
Later on, he contacted us claiming that he inserted a wrong family name by mistake.
As contact center agent, what do you ask the client for ? and what is the next step we should do from our end?', N'Ask him to send his request by email to CSC@bankofbeirut.com from his subscribed email address and forward it to BOB finance operations team.', N'Get the new name through the phone and send an email to BOB finance operations team for approval to change it from their end.', N'Ask the client to refer to any bob finance branch showing his ID or passport', N'Get the new name through the phone and call LAROC to change the name after bob finance operations team approval.', N'NULL', 1, NULL, 9, 75, 1)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (21, N'q17.png', N'Mr. X visited Jdeideh branch to perform two transactions:
- To deposit a check of $16,000 issued by Mr. Y who is a Byblos bank baabdath branch customer
- To deposit a cash amount of $20,000

At the counter, what should be requested from Mr. X for each operation?', N'The client should provide his ID to the teller and sign the requested papers', N'The client should provide his ID to the teller and sign the proof of income related to the amount and the check', N'The client should sign the backside of the check, the requested papers and the proof of income related to the cask amount', N'The client doesn''t do anything, he just waits for the teller to accomplish the relevant process and sign receipts', N'NULL', 4, NULL, 8, 60, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (22, N'q17.png', N'Case:
Mr. X visited Jdeideh branch to perform two transactions:
- To deposit a check of $16,000 issued by Mr. Y who is a Byblos bank baabdath branch customer
- To deposit a cash amount of $20,000

What are the value dates and the commissions for each transaction?', N'Check value needs 4 working days with 2$ commission and cash needs 4 working days with 2‰ commission', N'Check value needs 4 working days with 2$ commission and cash needs 5 working days with 2‰ commission', N'Check value needs 3 working days with 2$ commission and cash needs 4 working days with 2‰ commission', N'NULL', N'NULL', 2, NULL, 3, 60, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (23, N'q17.png', N'Mr. Chalhoub, a bob client, has a credit card with a limit of 10,000 USD and never used it.
On Tuesday, the 21st of January at 10 am, he used his card for 500 USD in Spinneys.
On Wednesday, the 22nd of January at 4 pm, he used it for 700 USD in an electronic shop.
On Friday, the 24th of January at 2 pm , he used it for another 700 USD for an hotel booking.
Knowing that the daily limit for a credit card usage is 1000 USD and the weekly limit is 2000 USD, what is the amount that can be used on Tuesday the 28th of January at 9 am?', N'USD 100', N'USD 500', N'USD 1,000', N'USD 1,200', N'USD 0', 1, N'The weekly limit is 2,000 USD; the amount used will be reset after exactly one week. Therefore until Tuesday the 28th of January at 9 am the client has used 1900 USD.', 1, 60, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (24, N'q17.png', N'For online banking, you can request a Service amendment package (Inquiry/Full) through:', N'Mobile Application or Online banking', N'Mobile Application or Branch', N'Online banking or Branch', N'Mobile application, Online Banking, or Branch', N'NULL', 3, NULL, 2, 30, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (25, N'NULL', N'Add External beneficiary to your online banking can be requested through:', N'Mobile Application or Online banking', N'Mobile Application or Branch', N'Online banking or Branch', N'Mobile application, Online Banking, or Branch', N'NULL', 4, N'*Premium Club: 1st Winner Acc. 0 fee, 2nd Winner Acc. 0 fee, 1st Debit Card 0 fee
(Any type), 2nd Debit Card 2$ fee
(Any type), If Account is Joint: Eligible for 2 free debit cards on each Winner Acc.

*Gold Club: 1st Winner Acc. 0 fee, 2nd Winner Acc. 0 fee, 1st Debit Card 0 fee
(Any type), 2nd Debit Card 2$ fee
(Any type), If Account is Joint: Eligible for 2 free debit cards on each Winner Acc.

*Normal Client: 1st Winner Acc. 10$ fees, 2nd Winner Acc. 10$ fees, 1st Debit Card 0 fee
(Any type), 2nd Debit Card 2$ fee
(Any type), If Account is Joint: 1st DC for free and $2 on each additional', 2, 30, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (26, N'NULL', N'Mr. Nehme has a joint account with his wife which is segmented as “Gold Club”. Under which, they hold two winner accounts (One USD and one LBP), a Gold credit card and a term deposit account of O/S USD 30,000.
Knowing that two active Platinum debit cards exist under each winner account (Total of 4 debit cards), what would be the monthly fee charged on each winner account?
', N' 0 USD', N'2 USD', N'4 USD', N'12 USD', N'2 USD on first winner account and 12 USD on the second', 1, NULL, 4, 50, 1)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (27, N'NULL', N'Please choose one answer from the below services that the Minor Accounts can benefit from:', N'Online banking user.', N'His account can be added as external beneficiary (Can receive money through online banking).', N'Debit card issuance.', N'Winner account', N'None of the above.', 2, N'Please note that for minor accounts, the account holder cannot benefit neither from the Online Banking User nor Credit/Debit Card.
In addition, the winner account is only opened for customers above 18 years old.

Concerning the external beneficiary and as per the attached process used by the Contact Center; once receiving an external beneficiary requests through web, a confirmation call should take place with the beneficiary in order to add the requested beneficiary ledger to the sender’s account.
In our case and for minor accounts specifically, the confirmation call should be done with the legal tutor who is responsible of this account until the Minor turn above 18.
', 2, 20, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (28, N'NULL', N'Mr. X, a Bank of Beirut client wanted to transfer an amount to his wife in Qatar using Western Union, noting that his wife is not a Bank of Beirut customer.
At the same time he logged into WU application and to his online Banking in order to execute many transfers.

- What is the transaction limit for each service (WU.com / ABMT) ?

Choose the appropriate answer:
', N'USD 590 / USD 1000', N'USD 600 without transaction fees / USD 1000', N'USD 600 including transaction fees / USD 1000', N'USD 3000 / USD 1000', N'NULL', 2, NULL, 9, 50, 1)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (29, N'NULL', N'The 40Z account, is a new account that is being used for international incoming payment orders.
The account can be opened through branch ?', N'TRUE', N'FALSE', N'NULL', N'NULL', N'NULL', 2, NULL, 8, 10, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (30, N'NULL', N'The issuance fees of a banker draft in USD is 20 USD', N'TRUE', N'FALSE', N'NULL', N'NULL', N'NULL', 1, NULL, 3, 10, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (31, N'NULL', N'All wire transfers to outside Lebanon, done through the branch for an amount less than 200,000 USD if the client is not related to any segment, will cost 40 USD ( 25 Commission /15 USD Swift ) ', N'TRUE', N'FALSE', N'NULL', N'NULL', N'NULL', 1, NULL, 3, 15, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (32, N'NULL', N'As a contact center agent, sometimes you will encounter angry or frustrated customers, concerning a bad experience with branch or misunderstanding/mistake with his account or any other bank decision
How you deal with such type of callers?', N'Try to listen to client, if client didn’t calm down then ask to transfer the call to your mentor ', N'Just offer them the needed solution, noting that you cannot accept from them to speak negatively about your company', N'Apologies for any inconvenience caused, but if the client didn’t calm down you ask to close the line', N'Apologies for any inconvenience caused if applies, and let them know you understand them, and that you are trying to solve their problem or answer their inquiries as per process', N'Apologies for any inconvenience caused, and try to defend the bank but if the client doesn’t want to listen to you, you take it personally and you have the right to shout at him and even close the line', 4, N'Sometimes you will encounter angry or frustrated customers. Instead of trying to argue (discuss) with them, you should work hard to diffuse the situation 
 Let them have their say and express themselves, don’t even think about interrupting them and don’t try to talk over them 
 Don’t take it personal
 Speak clearly
 Stay calm
 Never get angry or upset
 You should apologize for any inconvenience caused and be willing to spend a reasonable of time to allow the customer to cool down.
 You need to be willing to empathize with your customer, let them know that you understand them and that you’re trying to solve their problems and answer their inquiries
 Understanding the customer and the problem is key for anyone in a customer facing role
 Do escalate the situation quickly and reply the client as soon as possible
 Define the root cause and retrieve the best alternative solution
 Follow up afterward
', 14, 60, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (33, N'NULL', N'Which from the following service is NOT available on the ATM', N'Instacash', N'Cash/Check deposit ', N'Mobile prepaid cards recharge.', N'All of the above', N'NULL', 2, NULL, 2, 10, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (34, N'NULL', N'Mrs. Khoury visited her branch at Jal Dib Square, on Tuesday at 10:30am, for online banking enrollment; for both:
- Her single account
- Her joint account being held with her husband
Assuming that the branch employees did their job promptly, how & when Mrs. Khoury will receive her credentials related to both users?', N'Temporary password via SMS & Email, On the spot just after that the user is being approved by the BM/ABM ', N'For single account: Temporary password via SMS & Email, On the spot just after that the user is being approved by the BM/ABM (username already chosen upon enrolling the user)
For joint account: In a sealed envelope via regular mail, on the second working ', N'The next day for both accounts Via sms & Email', N'NULL', N'NULL', 1, NULL, 2, 60, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (35, N'NULL', N'To how many market segments, BoB online banking customers are currently divided?', N'There isn''t any market segment for BoB customers within the consumer online banking', N'There is currently one market segment for all BoB customers, within the consumer online banking: “Global Consumer Online Banking Customers”', N'There is Two market segment for all BoB customers, within the consumer online banking: "Global" and "Premium"', N'NULL', N'NULL', 2, NULL, 2, 30, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (36, N'NULL', N'How many available service packages are there currently, for BoB online customers? Nominate them', N'4 service packages for BoB online customers:                                        Enquiry Package.
Full Package.
Western Union Full Service Package.
Western Union Inquiry Service Package.

', N'2 service packages for BoB online customers:                                        Enquiry Package
Full Package', N'NULL', N'NULL', N'NULL', 1, NULL, 2, 10, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (37, N'NULL', N'Mr. Khawand, a BoB client was trying to deposit a check in one of BoB CCDM, but the operation was interrupted due to CCDM problem.
3 messages appeared on the CCDM screen:  “Unable to process the transaction at this time” / “Please Wait” / “Check Accepted”.
These messages were appearing on the screen without stop, while the CCDM retained the debit card.
After waiting for around 7 minutes without any change in the CCDM status, Mr. Khawand called the contact center while he was still in front of the CCDM, and he explained to you the problem.
Noting that when you checked the ATM monitoring application, you found that there is a hardware error in the check deposit field and in the card reader.
How do you handle this case, taking into consideartion that this happened after working hour?
', N'Ask the client to come to the branch the next day and regain his card after providing his ID card and coordinate with them to ensure that the check was successfully deposited; if not, client should sign a dispute form (especially if the client didn’t rece', N'Explain to the client that our duty is to block the card in such case, unless he wants to keep it active & retained in the CCDM on his own responsibility, in order to pass later on by the branch to regain it. Ask the client to sign a dispute form in case ', N'Nothing can be done from our part appologize from client and ask them to refer to their branch.              Coordinate with Mr. Georges Rif (if time is suitable) in order to stop the CCDM. 

', N'Should stop the CCDM to avoid unwanted problems with other clients, because the machine is facing a hardware error, especially in the card reader, that could not be resolved at our end.Send an email to Mr. Rif, the related branch and the concerned parties informing them about the reason of stopping the CCDM.


', N'Option 2 and 4', 5, NULL, 2, 150, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (38, N'NULL', N'Mr. Hanna, a BoB client at Broumana Branch, travelled to Paris in a business trip.
He wanted to access his personal online banking to check his accounts, and he preferred to use his friend’s laptop profiting from the hotel free internet connection, instead of accessing the mobile application on his mobile phone; because he wanted to clearly export the balances to excel and print them out.
What are the four steps, (information to be filled), required by the system to be able to access his personal online banking?', N'Username, Password, Captcha, OTP', N'Username, Password, OTP', N'Username, Password, OTP, RSA question', N'Username, Password', N'NULL', 1, N'When a user logs in from a device other than the first one from which he logged in for the first time, he will be challenged by the RSA Questions.
When a user logs in from a new device & from another country, he will be challenged by a conformation code sent to his mobile (OTP).', 2, 60, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (39, N'NULL', N'Mr. Nakhle, owner of Metica Company, holder of a corporate account at BoB.
He ordered the company’s Accounting Manager to transfer online an amount of $1,000 to 8 employees, on 01-12-2014, to their business pay cards; using the business online banking.
When these employees can use their money?
', N'They cannot use their money on the same day, it needs 4 working day for value date
', N'They can use their money on the next working day', N'They can use their money on the same day (same value date)', N'NULL', N'NULL', 3, NULL, 1, 30, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (40, N'NULL', N'Mr. Nakhle, owner of Metica Company, holder of a corporate account at BoB.
He ordered the company’s Accounting Manager to transfer online an amount of $1,000 to 8 employees, on 01-12-2014, to their business pay cards; using the business online banking.
How much they will be charged, per transaction, when using their cards at Byblos bank ATMs?
', N'Since Byblos Bank is one of the Banks using the same IPN network, then every transaction will be charged $3 (same features as debit cards)
', N'Since Byblos Bank isnt one of the Banks using the same IPN network, then every transaction will be charged more then  $3
', N'Since Byblos Bank is one of the Banks using the same IPN network, then every transaction will be charged $3 (same features as debit cards)
', N'NULL', N'NULL', 3, NULL, 1, 60, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (41, N'NULL', N'Foreign checks will be rejected once deposited through CCDM since only checks drawn by Lebanese banks are accepted', N'TRUE', N'FALSE', N'NULL', N'NULL', N'NULL', 1, NULL, 2, 15, 0)
INSERT [dbo].[Question] ([QnID], [ImageName], [Qn], [Option1], [Option2], [Option3], [Option4], [Option5], [Answer], [AnswerDescription], [CategoryID], [QnTime], [QnVolatile]) VALUES (42, N'NULL', N'Mr. Khoury has a joint account with his wife. Under which, they hold a blink account, an active Classic credit card and two active debit cards linked on the Blink account as primary.
What would be the monthly fee charged on the blink account?', N'0 USD', N'2 USD', N'3 USD', N'4 USD', N'5 USD', 2, N'Once a client has a blink account and an active credit card only under account, the blink account will be exempted from monthly charges; in addition 1st debit card is offered free with the blink and client will be charged accordingly 2 USD fees for the second debit card.', 4, 60, 0)
SET IDENTITY_INSERT [dbo].[Question] OFF

INSERT [dbo].[Participant] ([ParticipantID], [email], [FullName], [Q1Grade], [Q2Grade], [Q3Grade], [Q4Grade], [LastResetDate], [UserRole]) VALUES (N'osmat', N'oayyash@bankofbeirut.com', N'Ismat Ayash', NULL, NULL, NULL, NULL, CAST(N'2020-02-24 00:00:00.000' AS DateTime),N'Admin')
INSERT [dbo].[Participant] ([ParticipantID], [email], [FullName], [Q1Grade], [Q2Grade], [Q3Grade], [Q4Grade], [LastResetDate], [UserRole]) VALUES (N'oussam-r', N'orizk@bankofbeirut.com', N'Osama Rizk', NULL, NULL, NULL, NULL, CAST(N'2020-02-24 00:00:00.000' AS DateTime),N'Agent')
INSERT [dbo].[Participant] ([ParticipantID], [email], [FullName], [Q1Grade], [Q2Grade], [Q3Grade], [Q4Grade], [LastResetDate], [UserRole]) VALUES (N'raef-b', N'rbeaini2@bankofbeirut.com', N'Raef Beaini', NULL, NULL, NULL, NULL, CAST(N'2020-02-24 00:00:00.000' AS DateTime),N'Supervisor')
INSERT [dbo].[Participant] ([ParticipantID], [email], [FullName], [Q1Grade], [Q2Grade], [Q3Grade], [Q4Grade], [LastResetDate], [UserRole]) VALUES (N'ziad', N'zmacaron@bankofbeirut.com', N'Ziad Maacron', NULL, NULL, NULL, NULL, CAST(N'2020-02-24 00:00:00.000' AS DateTime),N'Agent')
SET IDENTITY_INSERT [dbo].[Quiz] ON 

INSERT [dbo].[Quiz] ([QuizID], [Quizdate], [Score], [TimeSpent]) VALUES (1, CAST(N'2020-01-01 00:00:00.000' AS DateTime), CAST(0.850 AS Decimal(5, 3)), 34)
SET IDENTITY_INSERT [dbo].[Quiz] OFF
SET IDENTITY_INSERT [dbo].[QuizResult] ON 

INSERT [dbo].[QuizResult] ([QRID], [QnID], [AnsStatus], [QuizID], [ParticipantID], [Countable]) VALUES (1, 1, N'Incorrect', 1, N'osmat',1)
INSERT [dbo].[QuizResult] ([QRID], [QnID], [AnsStatus], [QuizID], [ParticipantID], [Countable]) VALUES (2, 3, N'Correct', 1, N'osmat',1)
INSERT [dbo].[QuizResult] ([QRID], [QnID], [AnsStatus], [QuizID], [ParticipantID], [Countable]) VALUES (3, 17, N'Correct', 1, N'osmat',1)
SET IDENTITY_INSERT [dbo].[QuizResult] OFF

SET IDENTITY_INSERT [dbo].[AppSetting] ON 
INSERT [dbo].[AppSetting] ([Id], [NumberOfQuestions], [DefaultUserRole], [UserRoles], [DaysBetweenQuizes]) VALUES (1, 3, N'Agent', N'Agent,Admin,Supervisor', 7)
SET IDENTITY_INSERT [dbo].[AppSetting] OFF

UPDATE dbo.Question
set Option3 = null
where Option3 = 'NULL'

UPDATE dbo.Question
set Option4 = null
where Option4 = 'NULL'

UPDATE dbo.Question
set Option5 = null
where Option5 = 'NULL'