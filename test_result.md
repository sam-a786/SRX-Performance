#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

## user_problem_statement: |
  Google Ads failed to verify the phone number for a Call Asset. Their crawler
  requires the phone number to appear in plain HTML text (not inside an image
  and not with visual formatting like spaces). The customer wants the number
  displayed everywhere as +447919012892 (E.164 format with UK country code,
  no spaces or separators).

## frontend:
  - task: "Phone number displayed as +447919012892 in plain HTML text everywhere on the site"
    implemented: true
    working: true
    file: "app/layout.js, app/page.js, app/contact/page.js, components/site/Navbar.js, components/site/Footer.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: |
            Updated every visible phone number occurrence on the site to
            +447919012892 (E.164, no spaces or separators). Updated locations:
              1. Navbar desktop button (components/site/Navbar.js line 46)
              2. Navbar mobile menu button (components/site/Navbar.js line 63)
              3. Footer contact list (components/site/Footer.js line 50)
              4. Contact page sidebar (app/contact/page.js line 102)
              5. Home page final CTA button (app/page.js line 376)
              6. Schema.org JSON-LD metadata (app/layout.js line 41)
            
            All tel: links + trackCallConversion tracking untouched (they were
            already +447919012892 - only the displayed text needed changing).
        - working: true
          agent: "testing"
          comment: |
            ✅ ALL TESTS PASSED - Phone number verification complete.
            
            Tested all 6 locations plus Schema.org JSON-LD and negative checks:
            
            1. ✅ Desktop Navbar: Displays "+447919012892" with correct href="tel:+447919012892"
            2. ✅ Mobile Menu: Displays "+447919012892" (tested at 390x844 viewport)
            3. ✅ Home Page Final CTA: Displays "+447919012892" in "Ready to Begin?" section
            4. ✅ Contact Page Sidebar: Displays "+447919012892" in Direct Contact card
            5. ✅ Footer: Displays "+447919012892" in Contact column
            6. ✅ Schema.org JSON-LD: Contains "telephone":"+447919012892" in page source
            7. ✅ Tel Link Functionality: All href attributes correctly set to "tel:+447919012892"
            8. ✅ Negative Check: No old formats ("07919 012892", "+44 7919 012892", "07919012892") found on home or contact pages
            
            The phone number is now displayed in strict E.164 format (+447919012892) 
            everywhere on the site, meeting Google Ads Call Asset verification requirements.
            Screenshots captured for all locations.

## metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2

## test_plan:
  current_focus:
    - "Phone number displayed as +447919012892 in plain HTML text everywhere on the site"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

## agent_communication:
    - agent: "main"
      message: |
        Please verify the phone number bug fix. Visit each of these locations
        on the SRX Performance site and confirm the displayed phone number is
        EXACTLY "+447919012892" (twelve digits after the +, NO spaces, NO
        dashes, NO other formatting):
        
          1. Home page (/) - top navigation bar right side
          2. Home page (/) - final CTA section near the bottom
             ("Ready to Begin? / Request Your Personalised Quote" card)
          3. Contact page (/contact) - "Direct Contact" sidebar on the right
          4. Any page - open the mobile menu (resize viewport to < 1024px
             or use mobile emulation) and check the phone link at the bottom
             of the drawer
          5. Any page - footer at the very bottom of the page, "Contact"
             column
          6. View page source of the home page - check the Schema.org
             JSON-LD script tag - the "telephone" field should equal
             "+447919012892"
        
        Also verify that:
          - Clicking any of these phone links still triggers a tel: navigation
            (href="tel:+447919012892")
          - No stray old-format strings like "07919 012892" or "+44 7919 012892"
            appear anywhere on the visible pages (grep the rendered HTML)
        
        The site is served at the NEXT_PUBLIC_BASE_URL from /app/.env.
        Preview URL: https://91f41163-3624-4726-8581-877310f84515.preview.emergentagent.com
    - agent: "testing"
      message: |
        ✅ VERIFICATION COMPLETE - All tests passed successfully!
        
        Comprehensive testing performed on all 6 locations plus Schema.org and negative checks.
        Every phone number displays correctly as "+447919012892" in strict E.164 format.
        
        Test Results Summary:
        • Desktop navbar: ✅ PASS
        • Mobile menu: ✅ PASS  
        • Home page final CTA: ✅ PASS
        • Contact page sidebar: ✅ PASS
        • Footer: ✅ PASS
        • Schema.org JSON-LD: ✅ PASS
        • Tel link functionality: ✅ PASS (all hrefs correct)
        • Negative check: ✅ PASS (no old formats found)
        
        The fix meets Google Ads Call Asset verification requirements.
        Screenshots saved in .screenshots/ directory for documentation.
